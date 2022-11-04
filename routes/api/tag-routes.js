const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  	Tag.findAll({
    	include: [Product]
  	})
    .then((allTags) => {
      	res.json(allTags);
    })
    .catch((err) => {
      	console.log(err);
		res.status(500).json({err:err})
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
	Tag.findByPk(req.params.id, {
		include:[Product]
	}).then((oneTag)=>{
		if(!oneTag) {
			return res.status(404).json({msg:'No tag with the id!'});
		}
		res.json(oneTag);
	}).catch((err)=>{
		console.log(err);
		res.status(500).json({err:err})
	})
});

router.post("/", (req, res) => {
  	// create a new tag
  	console.log(req.body);
  	Tag.create({
		tag_name:req.body.tag_name	
  	}).then((newTag)=>{
		res.status(201).json(newTag);
	}).catch((err)=>{
		console.log(err);
		res.status(500).json({err:err});
	})
});

router.put("/:id", (req, res) => {
  	// update a tag's name by its `id` value
	Tag.update(
		{
			tag_name:req.body.tag_name		
		},{
			where:{
				id:req.params.id
			}
		}
	).then((updatedTag)=>{
		if (updatedTag[0]===0) {
			return res.status(400).json({msg:"No Tag with the id"})
		}
		res.json(updatedTag)
	}).catch((err)=>{
		console.log(err);
		res.status(500).json({err:err});
	})
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
	Tag.destroy({
		where:{
			id:req.params.id
		}
	}).then((delTag)=>{
		if(delTag===0){
			return res.status(400).json({msg:"No Tag with the id"})
		}
		res.json(delTag);
	}).catch((err)=>{
		console.log(err);
		res.status(500).json({err:err})
	})
});

module.exports = router;
