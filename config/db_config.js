const mongoose = require("mongoose");

//mongoose.connect("mongodb+srv://samu:sam123@cluster0.bbfz7.mongodb.net/MediApp?retryWrites=true&w=majority",
mongoose.connect("mongodb+srv://samundar:samundar@cluster0.wldln.mongodb.net/Fammhouse?retryWrites=true&w=majority",
{
    useUnifiedTopology:true,
    useNewUrlParser:true,
})
    .then(()=>console.log("mongodb is connect"))
    .catch(err=>console.error("Error in connection"));