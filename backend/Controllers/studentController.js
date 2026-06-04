import prisma from "../prismaClient.js";

export const createStudent = async (req, res, next) => {
  try {
    const student = await prisma.student.create({
      data: req.body,
    });

    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        stream: true,
      },
    });

    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        stream: true,
        scores: {
          include: {
            subject: true,
          },
        },
      },
    });

    res.json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = await prisma.student.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(student);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    await prisma.student.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};