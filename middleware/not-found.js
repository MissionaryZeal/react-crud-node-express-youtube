const notFound = (req, res) => {
    res.status(404).send("Not found the route");
}
module.exports = notFound