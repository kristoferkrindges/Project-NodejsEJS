const express = require("express");

const router = express.Router();

const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
	try {
		let checklists = await Checklist.find({});
		//res.status(200).json(checklists);
		res.status(200).render("checklists/index", { checklists: checklists });
		//res.send(checklist);
	} catch (error) {
		//res.status(500).json(error);
		res
			.status(200)
			.render("pages/error", { error: "Erro ao exibir as Listas" });
	}
	//console.log("Olá");
	//res.send();
});

router.get("/new", async (req, res) => {
	try {
		let checklist = new Checklist();
		res.status(200).render("checklists/new", { checklist: checklist });
	} catch (error) {
		res
			.status(500)
			.render("pages/error", { errors: "Erro ao carregar o formulário" });
	}
});

router.get("/:id/edit", async (req, res) => {
	try {
		let checklist = await Checklist.findById(req.params.id);
		res.status(200).render("checklists/edit", { checklist: checklist });
	} catch (error) {
		res.status(500).render("pages/error", {
			errors: "Erro ao exibir edição de listas de tarefas",
		});
	}
});

router.post("/", async (req, res) => {
	let { name } = req.body.checklist;
	let checklist = new Checklist({ name });
	//console.log(name);
	try {
		//await Checklist.create({ name });
		await checklist.save();
		//res.status(200).json(checklist);
		res.redirect("/checklists");
	} catch (error) {
		res
			.status(422)
			.render("checklists/new", { checklists: { ...checklist, error } });
	}
});

router.get("/:id", async (req, res) => {
	try {
		// let checklist = await Checklist.findById(req.params.id).populate("tasks");
		let checklist = await Checklist.findById(req.params.id);
		//res.status(200).json(checklist);
		res.status(200).render("checklists/show", { checklist: checklist });
	} catch (error) {
		//res.status(422).json(error);
		res
			.status(500)
			.render("pages/error", { error: "Erro ao exibir as Listas" });
	}
});

router.put("/:id", async (req, res) => {
	let { name } = req.body.checklist;
	let checklist = await Checklist.findById(req.params.id);
	try {
		await checklist.update({ name });
		res.redirect("/checklists");
	} catch (error) {
		let errors = error.errors;
		res
			.status(422)
			.render("checklists/edit", { checklist: { ...checklist, errors } });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		let { name } = req.body;
		let checklist = await Checklist.findByIdAndRemove(req.params.id, { name });
		res.redirect("/checklists");
	} catch (error) {
		res.status(500).render("pages/error", {
			errors: "Erro ao deletar a listas de tarefas",
		});
	}
});

module.exports = router;
