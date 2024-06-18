export const errorMiddleware = (req, res, error, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error!";
    res.status(500).json({
        success: false,
        statusCode,
        message
    })
}