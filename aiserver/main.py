import os
import time
import pika
import mysql.connector
from mysql.connector import Error
from typing import Dict, Any
import signal
from dotenv import load_dotenv

load_dotenv()


class Assistant:
    def __init__(self, key: str = os.getenv("OPENAI_API_KEY")):
        if not key:
            raise ValueError(
                "No API key provided. Set OPENAI_API_KEY environment variable."
            )

        self.key = key
        self.name = "Assistant"
        self.version = "0.0.1"
        self.client = None
        self.thread = None
        self.assistant = None
        self.assistants = {
            "applicant": {
                "name": "Applicant",
                "instructions": "You are a hiring specialist, be helpful and help user build their resume.",
                "tools": [{"type": "code_interpreter"}],
                "model": "gpt-4-1106-preview",
            },
            "hiring_manager": {
                "name": "Hiring Manager",
                "instructions": "You are a hiring specialist, be helpful help user rank and pick the best resumes for a given position.",
                "tools": [{"type": "code_interpreter"}],
                "model": "gpt-4-1106-preview",
            },
        }
        # RabbitMQ Connection
        self.rabbitmq_connection = pika.BlockingConnection(
            pika.ConnectionParameters(host="localhost")
        )
        self.rabbitmq_channel = self.rabbitmq_connection.channel()
        self.rabbitmq_channel.queue_declare(queue="your_queue_name")
        self.rabbitmq_queues = [
            "education_history",
            "work_history",
            "skills",
            "certifications",
            "summary",
            "references",
            "contact_info",
            "awards",
            "languages",
            "interests",
            "objectives",
            "accomplishments",
            "projects",
        ]

        # MySQL Connection Parameters (adjust these as necessary)
        self.mysql_config = {
            "host": "localhost",
            "database": "your_database",
            "user": "your_username",
            "password": "your_password",
        }

    def run(self):
        def generate_callback(queue_name):
            def callback(ch, method, properties, body):
                print(f"Received from {queue_name}: {body}")
                # response = self.process_message(queue_name, body)
                # self.store_in_database(response)
                ch.basic_ack(delivery_tag=method.delivery_tag)

            return callback

        for queue_name in self.rabbitmq_queues:
            # Declare the queue to ensure it exists
            self.rabbitmq_channel.queue_declare(queue=queue_name)

            # Set up a consumer for each queue with a specific callback
            self.rabbitmq_channel.basic_consume(
                queue=queue_name, on_message_callback=generate_callback(queue_name)
            )

        try:
            print("Waiting for messages. To exit press CTRL+C")
            self.rabbitmq_channel.start_consuming()
        except KeyboardInterrupt:
            self.rabbitmq_channel.stop_consuming()
        finally:
            self.rabbitmq_connection.close()

    def process_message(self, message):
        # Implement message processing logic here
        # This should call the appropriate assistant and return its response
        pass

    def store_in_database(self, response):
        try:
            connection = mysql.connector.connect(**self.mysql_config)
            if connection.is_connected():
                cursor = connection.cursor()
                query = "INSERT INTO responses (response) VALUES (%s)"
                cursor.execute(query, (response,))
                connection.commit()
                cursor.close()
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            if connection.is_connected():
                connection.close()

    def create(self, assistant: Dict[str, Any]) -> Any:
        """
        Creates a new OpenAI assistant using the provided configuration.

        Args:
            assistant (Dict[str, Any]): Configuration for the new assistant.

        Returns:
            Any: The newly created OpenAI assistant object.
        """
        self.client = OpenAI(api_key=self.key)
        self.assistant = self.client.beta.assistants.create(
            name=assistant["name"],
            instructions=assistant["instructions"],
            tools=assistant["tools"],
            model=assistant["model"],
        )

        return self.assistant

    def destroy(self, assistant_id: str) -> Dict[str, Any]:
        """
        Deletes the assistant with the given ID.

        Args:
            assistant_id (str): The ID of the assistant to delete.

        Returns:
            Dict[str, Any]: Information about the deleted assistant.
        """
        return self.client.beta.assistants.delete(assistant_id)

    def update(self, assistant_id: str, fields: Dict[str, Any]) -> Any:
        """
        Updates an existing assistant with the specified fields.

        Args:
            assistant_id (str): The ID of the assistant to update.
            fields (Dict[str, Any]): Fields to update.

        Returns:
            Any: The updated assistant.
        """
        self.assistant = self.client.beta.assistants.update(assistant_id, **fields)
        return self.assistant

    def add_thread(self) -> Any:
        """
        Creates a new thread if one does not already exist.

        Returns:
            Any: The newly created thread or the existing thread.
        """
        if self.thread is not None:
            return self.thread
        self.thread = self.client.beta.threads.create()
        return self.thread

    def remove_thread(self, thread_id: str) -> Dict[str, Any]:
        """
        Removes a thread with the given ID.

        Args:
            thread_id (str): The ID of the thread to remove.

        Returns:
            Dict[str, Any]: Information about the deleted thread.
        """
        return self.client.beta.threads.delete(thread_id)

    def get_thread(self) -> Any:
        """
        Returns the current thread object.

        Returns:
            Any: The current thread object.
        """
        return self.thread

    def retrieve_thread(self, thread_id: str) -> Dict[str, Any]:
        """
        Retrieves a thread with the given ID.

        Args:
            thread_id (str): The ID of the thread to retrieve.

        Returns:
            Dict[str, Any]: The retrieved thread.
        """
        self.thread = self.client.beta.threads.retrieve(thread_id)
        return self.thread

    def close_connections(self):
        """
        Closes all connections to OpenAI.
        """
        if self.rabbitmq_connection is not None:
            self.rabbitmq_connection.close()
        if self.mysql_connection is not None:
            self.mysql_connection.close()
        print("Connections closed.")


def handle_sigterm(*args):
    assistant.close_connections()


if __name__ == "__main__":
    assistant = Assistant()
    assistant.run()
    signal.signal(signal.SIGTERM, handle_sigterm)
    signal.signal(signal.SIGINT, handle_sigterm)
