import prisma from "../prismaClient.js";

export const createSubject = async (req, res, next) => {
  try {
    const subject = await prisma.subject.create({
      data: {
        name: req.body.name,
      },
    });

    res.status(201).json(subject);
  } catch (error) {
    next(error);
  }
};

export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        streams: {
          include: {
            stream: true,
          },
        },
      },
    });

    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

export const getSubject = async (req, res, next) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json(subject);
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const subject = await prisma.subject.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(subject);
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // 1. delete related StreamSubject entries
    await prisma.streamSubject.deleteMany({
      where: { subjectId: id },
    });

    // 2. delete related scores
    await prisma.score.deleteMany({
      where: { subjectId: id },
    });

    // 3. delete subject
    await prisma.subject.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const assignSubjectToStream = async (req, res, next) => {
  try {
    const { streamId, subjectId } = req.body;

    const assignment = await prisma.streamSubject.create({
      data: {
        streamId,
        subjectId,
      },
    });

    res.status(201).json(assignment);
  } catch (error) {
    next(error);
  }
};