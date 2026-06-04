import prisma from "../prismaClient.js";
import calculateGrade from "../utils/grading.js";

export const createScore = async (req, res, next) => {
  try {
    const {
      studentId,
      subjectId,
      catScore,
      examScore,
    } = req.body;

    const existing = await prisma.score.findFirst({
      where: {
        studentId,
        subjectId,
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Score already submitted",
      });
    }

    const total =
      Number(catScore) +
      Number(examScore);

    const score = await prisma.score.create({
      data: {
        studentId,
        subjectId,
        catScore,
        examScore,
        total,
      },
    });

    res.status(201).json(score);
  } catch (error) {
    next(error);
  }
};

export const updateScore = async (req, res, next) => {
  try {
    const { catScore, examScore } = req.body;

    const total =
      Number(catScore) +
      Number(examScore);

    const score = await prisma.score.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        catScore,
        examScore,
        total,
      },
    });

    res.json(score);
  } catch (error) {
    next(error);
  }
};

export const getStudentPerformance = async (
  req,
  res,
  next
) => {
  try {
    const scores = await prisma.score.findMany({
      where: {
        studentId: Number(req.params.studentId),
      },
      include: {
        subject: true,
      },
    });

    const result = scores.map((score) => ({
      ...score,
      grade: calculateGrade(score.total),
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getClassPerformance = async (
  req,
  res,
  next
) => {
  try {
    const subjectId = Number(req.params.subjectId);

    const scores = await prisma.score.findMany({
      where: {
        subjectId,
      },
      include: {
        student: {
          include: {
            stream: true,
          },
        },
      },
    });

    res.json(scores);
  } catch (error) {
    next(error);
  }
};