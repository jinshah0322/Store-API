require("express-async-errors")
const { query } = require("express")
const Product = require("../models/product")

const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,fields,limit, numericFilter} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === "true" ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name,$options:"i"}
    }
    if(sort){
        var sortList = sort.split(',').join(' ')
    } else{
        var sortList = "createdAt"
    }
    if(fields){
        var fieldList = fields.split(",").join(' ')
    }
    if(!limit){
        var limitNumber = 10
    } else{
        var limitNumber = Number(limit)
    }
    if(numericFilter){
        const operatorMap = {
            '>':'$gt',
            '<':'$lt',
            '=':'$eq',
            '>=':'$gte',
            '<=':'$lte'
        } 
        const regex = /\b(<|>|=|<=|>=)\b/g
        let filter = numericFilter.replace(regex,(match)=>{
            return `-${operatorMap[match]}-`
        })
        const options = ['price','rating']
        filter = filter.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-') 
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }
    const products = await Product.find(queryObject).sort(sortList).select(fieldList).limit(limitNumber)
    res.send({nbHits:products.length,products,})
}

module.exports = {
    getAllProducts
}   