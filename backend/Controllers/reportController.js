import PDFDocument from "pdfkit";
import prisma from "../prismaClient.js";
import calculateGrade from "../utils/grading.js";

export const generateStudentReport = async (
  req,
  res,
  next
) => {
  try {
    const studentId = Number(req.params.studentId);

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        stream: true,
        scores: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename=report-card.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text(
      "IKONEX ACADEMY REPORT CARD",
      {
        align: "center",
      }
    );

    doc.moveDown();

    doc.text(
      `Student: ${student.firstName} ${student.lastName}`
    );

    doc.text(
      `Admission No: ${student.admissionNo}`
    );

    doc.text(
      `Class Stream: ${student.stream.name}`
    );

    doc.moveDown();

    let totalMarks = 0;

    student.scores.forEach((score) => {
      totalMarks += score.total;

      doc.text(
        `${score.subject.name} | ${score.total} | ${calculateGrade(
          score.total
        )}`
      );
    });

    const average =
      student.scores.length > 0
        ? totalMarks / student.scores.length
        : 0;

    doc.moveDown();

    doc.text(`Total Marks: ${totalMarks}`);
    doc.text(`Average: ${average.toFixed(2)}`);

    doc.end();
  } catch (error) {
    next(error);
  }
};