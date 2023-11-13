const amqp = require("amqplib");

async function sendMessage(queue, message) {
  // Connect to RabbitMQ server
  const connection = await amqp.connect("amqp://localhost");

  // Create a channel
  const channel = await connection.createChannel();

  // Ensure the queue exists (RabbitMQ will create it if not)
  await channel.assertQueue(queue, {
    durable: false, // set to true if you need the messages and queue to be persistent
  });

  // Send a message to the queue
  channel.sendToQueue(queue, Buffer.from(message));
  console.log(" [x] Sent '%s'", message);

  // Close the channel and connection
  await channel.close();
  await connection.close();
}

// Usage
sendMessage(
  "education_history",
  "The content of the entire PDF document is as follows:\n\n```\nYK Sugi \nyksu@csdojo.io \nExperience  \n\nProgram Manager Intern at Microsoft, Redmond, WA, 5/2015 – 8/2015 \n         I was responsible for designing and implementing a specific feature within Microsoft Dynamics \nCRM with developers and other PM's.  My responsibilities included the initial research, planning the \nproject, designing the product, creating wireframes, and writing and executing on a spec. \n \nData Science Intern at Microsoft, San Francisco, CA, 6/2014 – 8/2014 \n         My responsibilities in the Yammer data analytics team were: \n-\nConducted a statistical analysis to deepen our understanding of existing content’s effects \non user engagements. \n-\nResponsible for creating an internal dashboard tool that is now used to view user \nengagement metrics such as the number of active users and the summary of their \nactivities on the Yammer website. \n \nFounder and President at Data Science Club at UBC, Vancouver, BC, 10/2013 – 5/2014 \n-\nResponsible for acquiring more than 120 members \n-\nOrganized meet-ups to exchange our ideas on data science \n-\nFormed a team of several students to work on a machine learning competition on Kaggle \nSoftware Development Intern at Moneytree, Tokyo, 5/2013 – 8/2013\n\n   At this iPhone application company, I was responsible for creating JavaScript scripts that screen-\nscrape transaction information from our users’ bank accounts and credit card accounts.  I also created \nRuby scripts that solved miscellaneous business problems, including one machine learning \nclassification problem. \nEducation  \n\nUniversity of British Columbia, Vancouver, BC \n \n \nBS Candidate/Statistics Major, December 2015 \n \n \nGPA 87.6/100 \n \nSuffolk University, Boston, MA \n \n \nBS Candidate/Physics and Computer Science Majors (transferred out) \n \nGPA 3.964, Undergraduate Honors Program \nTechnical Skills  \n\nExperience in Product Management, Analytics/Statistics, and Software Engineering. \n \nTechnical Tools: \n-\nWireframing: Balsamiq, Microsoft PowerPoint \n-\nDesigning: Adobe InDesign, Photoshop, Illustrator \n-\nStatistical Analysis: R \n-\nMachine Learning: Python with NumPy and Pandas, Ruby, Spark (prior experience) \n-\nProgramming Technologies: SQL, MATLAB, Ruby on Rails, Java \n-\nProgramming Technologies, front end: JavaScript, HTML/CSS, LaTeX \n-\nVersion Control: Git, GitHub, Bitbucket \nOther Skills  \n \n \nLanguages: Fluent in English and Japanese \n \n \nPublic Speaking: Experience and ability to speak with passion and confidence in public \nspeaking and stand-up comedy \n  \nAwards  \n\nTELUS / IEEE Student Innovation Challenge, September 2015 \n \n \nOur team won a third place at the pitch contest where we presented an idea for a device that \nhelps the blind.  Our idea was a device that converts 3-dimensional special information into sound so \nthat blind people can “see” the environment by hearing.  We were awarded a $3000 grant to develop a \nprototype.  \nProjects \nFireflic, Winter 2014 \n \nAs a follow-up project of YamBomb! (see below), I designed and developed a mobile gaming \napp to pass around a “fire” amongst friends that “explodes” in 24 hours.  A user can attach an article \nor picture to the fire, so interesting content is passed to many people.  Developed with Javascript. \nYamBomb! , August 2014 \n \nA colleague at Microsoft and I created a gaming app with which one would send a “bomb” that \n“explodes” in 24 hours unless they pass it to somebody else.  It started with a few users and \norganically grew to more than 70 users within a week of its launch.  We developed the application \nwith Ruby on Rails and Yammer API. \nMarch Madness Prediction,  March 2014 \n \nI made a least square model for predicting winners of March Madness, the national college \nbasketball tournament in the United States.  I built this model with different types of regularizations \n(L1 and L2), utilizing Python libraries such as NumPy and matplotlib.  I ranked at the 32nd place out \nof 248 teams at the Kaggle competition. \n```\n\nThis text appears to cover the complete content of the PDF including the individual's experience, education, technical skills, languages, public speaking and awards, as well as descriptions of various projects. If you need the text in a different format or have any other requests, please let me know."
).catch(console.error);
