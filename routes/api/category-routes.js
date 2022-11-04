const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	Category.findAll({
		include: [Product],
	})
		.then((allCatetories) => {
			res.json(allCatetories);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ err: err });
		});
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	Category.findByPk(req.params.id, {
		include: [Product],
	})
		.then((oneCategory) => {
			if (!oneCategory) {
				return res.status(404).json({ msg: "No category with the id" });
			}
			res.json(oneCategory);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ err: err });
		});
});

router.post("/", (req, res) => {
	// create a new category
	console.log(req.body);
	Category.create({
		category_name: req.body.category_name
	}).then((newCat)=>{
		res.status(201).json(newCat);
	}).catch((err) => {
		console.log(err);
		res.status(500).json({err:err});
	})
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	Category.update(
		{
			category_name:req.body.category_name,
		},{
			where:{
				id:req.params.id
			}
		}
	).then((updatedCat)=> {
		if (updatedCat[0] === 0) {
			return res.status(400).json({msg:"No category with the id"})
		}
		res.json(updatedCat)
	}).catch((err)=> {
		console.log(err);
		res.status(500).json({err:err});
	})
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
	Category.destroy({
		where:{
			id:req.params.id
		}
	}).then((delCat)=> {
		if(delCat===0){
			return res.status(400).json({msg:"No Category with the id"})
		}
		res.json(delCat);
	}).catch((err)=>{
		console.log(err);
		res.status(500).json({err:err});
	})
});

module.exports = router;
