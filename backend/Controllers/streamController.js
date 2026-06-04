import prisma from "../prismaClient.js";

export const createStream = async (req, res, next) => {
  try {
    const stream = await prisma.classStream.create({
      data: req.body,
    });

    res.status(201).json(stream);
  } catch (error) {
    next(error);
  }
};

export const getStreams = async (req, res, next) => {
  try {
    const streams = await prisma.classStream.findMany({
      include: {
        students: true,
        subjects: {
          include: {
            subject: true,
          },
        },
      },
    });

    res.json(streams);
  } catch (error) {
    next(error);
  }
};

export const getStream = async (req, res, next) => {
  try {
    const stream = await prisma.classStream.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        students: true,
      },
    });

    res.json(stream);
  } catch (error) {
    next(error);
  }
};

export const updateStream = async (req, res, next) => {
  try {
    const stream = await prisma.classStream.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(stream);
  } catch (error) {
    next(error);
  }
};

export const deleteStream = async (req, res, next) => {
  try {
    await prisma.classStream.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Stream deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};