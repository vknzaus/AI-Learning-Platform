import { PrismaClient, QuestionType, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create only one Topic: Learn AI
  const aiTopic = await prisma.topic.create({
    data: {
      name: "Learn AI",
      description: "Fun and interactive introduction to Artificial Intelligence concepts",
      orderIndex: 1,
    },
  });

  // Create Lessons for Learn AI
  const aiBasicsLesson = await prisma.lesson.create({
    data: {
      topicId: aiTopic.id,
      title: "What is Artificial Intelligence?",
      description: "Discover the amazing world of AI and how it works",
      difficulty: Difficulty.BEGINNER,
      orderIndex: 1,
      prerequisites: [],
    },
  });

  const aiApplicationsLesson = await prisma.lesson.create({
    data: {
      topicId: aiTopic.id,
      title: "AI in Everyday Life",
      description: "Explore how AI is already part of your daily routine",
      difficulty: Difficulty.BEGINNER,
      orderIndex: 2,
      prerequisites: [aiBasicsLesson.id],
    },
  });

  // Create Sample Questions for Learn AI
  const questions = [
    {
      lessonId: aiBasicsLesson.id,
      type: QuestionType.MULTIPLE_CHOICE,
      content: {
        question: "What does AI stand for?",
        options: [
          "Artificial Intelligence",
          "Automated Integration", 
          "Advanced Interface",
          "Applied Innovation",
        ],
      },
      correctAnswer: {
        correctIndices: [0],
      },
      explanation:
        "AI stands for Artificial Intelligence, which refers to computer systems that can perform tasks that typically require human intelligence.",
      difficulty: Difficulty.BEGINNER,
      points: 10,
      orderIndex: 1,
    },
    {
      lessonId: aiBasicsLesson.id,
      type: QuestionType.TRUE_FALSE,
      content: {
        statement: "AI systems can only work with numerical data.",
        context:
          "Consider the various types of data that modern AI systems process.",
      },
      correctAnswer: {
        correct: false,
      },
      explanation:
        "This is false. AI systems can work with many types of data including text, images, audio, video, and more, not just numerical data.",
      difficulty: Difficulty.BEGINNER,
      points: 10,
      orderIndex: 2,
    },
    {
      lessonId: aiApplicationsLesson.id,
      type: QuestionType.MULTIPLE_CHOICE,
      content: {
        question: "Which of these is an example of AI in everyday life?",
        options: [
          "Voice assistants like Siri",
          "Recommendation systems on Netflix",
          "Photo tagging on social media",
          "All of the above",
        ],
      },
      correctAnswer: {
        correctIndices: [3],
      },
      explanation:
        "All of these are examples of AI in everyday life! AI is all around us, making our digital experiences smarter and more personalized.",
      difficulty: Difficulty.BEGINNER,
      points: 10,
      orderIndex: 1,
    },
  ];

  for (const questionData of questions) {
    await prisma.question.create({ data: questionData });
  }

  // Create sample achievements
  await prisma.achievement.create({
    data: {
      name: "First Steps",
      description: "Complete your first lesson",
      criteria: {
        type: "lesson_completed",
        target: 1,
      },
      points: 50,
      badgeTier: "BRONZE",
    },
  });

  await prisma.achievement.create({
    data: {
      name: "Quick Learner",
      description: "Answer 10 questions correctly in a row",
      criteria: {
        type: "streak",
        target: 10,
      },
      points: 100,
      badgeTier: "SILVER",
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`📚 Created ${await prisma.topic.count()} topics`);
  console.log(`📖 Created ${await prisma.lesson.count()} lessons`);
  console.log(`❓ Created ${await prisma.question.count()} questions`);
  console.log(`🏆 Created ${await prisma.achievement.count()} achievements`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
