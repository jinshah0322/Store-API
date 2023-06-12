const notFound = (req,res)=> res.status(404).send("<h1>Route Does not Exist</h1>")

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    console.log(err);
    res.json({
        status: "fail",
        message: "Something went wrong please try again after some time"
    });
};

module.exports = {
    notFound,
    errorHandler
}