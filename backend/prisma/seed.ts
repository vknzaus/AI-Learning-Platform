import { PrismaClient, QuestionType, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create Topics
  const aiTopic = await prisma.topic.create({
    data: {
      name: "AI Fundamentals",
      description: "Basic concepts and principles of Artificial Intelligence",
      orderIndex: 1,
    },
  });

  const mlTopic = await prisma.topic.create({
    data: {
      name: "Machine Learning",
      description: "Introduction to Machine Learning algorithms and techniques",
      orderIndex: 2,
    },
  });

  // Create Lessons
  const aiBasicsLesson = await prisma.lesson.create({
    data: {
      topicId: aiTopic.id,
      title: "What is Artificial Intelligence?",
      description: "Learn the fundamental concepts of AI and its applications",
      difficulty: Difficulty.BEGINNER,
      orderIndex: 1,
      prerequisites: [],
    },
  });

  const mlBasicsLesson = await prisma.lesson.create({
    data: {
      topicId: mlTopic.id,
      title: "Introduction to Machine Learning",
      description: "Understanding the basics of machine learning",
      difficulty: Difficulty.BEGINNER,
      orderIndex: 1,
      prerequisites: [aiBasicsLesson.id],
    },
  });

  // Create Sample Questions
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
      lessonId: aiBasicsLesson.id,
      type: QuestionType.FILL_BLANK,
      content: {
        text: "Machine Learning is a subset of {{blank1}} that enables computers to {{blank2}} without being explicitly programmed.",
        blanks: [
          {
            id: "blank1",
            acceptedAnswers: [
              "AI",
              "Artificial Intelligence",
              "artificial intelligence",
            ],
            caseSensitive: false,
            position: 1,
          },
          {
            id: "blank2",
            acceptedAnswers: ["learn", "improve", "adapt"],
            caseSensitive: false,
            position: 2,
          },
        ],
      },
      correctAnswer: {
        blanks: {
          blank1: ["AI", "Artificial Intelligence"],
          blank2: ["learn", "improve"],
        },
      },
      explanation:
        "Machine Learning is indeed a subset of AI that focuses on algorithms that can learn and improve from data.",
      difficulty: Difficulty.INTERMEDIATE,
      points: 15,
      orderIndex: 3,
    },
    {
      lessonId: mlBasicsLesson.id,
      type: QuestionType.MATCHING,
      content: {
        leftItems: [
          { id: "supervised", content: "Supervised Learning", type: "text" },
          {
            id: "unsupervised",
            content: "Unsupervised Learning",
            type: "text",
          },
          {
            id: "reinforcement",
            content: "Reinforcement Learning",
            type: "text",
          },
        ],
        rightItems: [
          {
            id: "labeled",
            content: "Uses labeled training data",
            type: "text",
          },
          {
            id: "patterns",
            content: "Finds hidden patterns in data",
            type: "text",
          },
          {
            id: "rewards",
            content: "Learns through rewards and penalties",
            type: "text",
          },
        ],
        instructions:
          "Match each type of machine learning with its correct description.",
      },
      correctAnswer: {
        pairs: {
          supervised: "labeled",
          unsupervised: "patterns",
          reinforcement: "rewards",
        },
      },
      explanation:
        "Supervised learning uses labeled data, unsupervised learning finds patterns in unlabeled data, and reinforcement learning uses a reward system.",
      difficulty: Difficulty.INTERMEDIATE,
      points: 20,
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
