"use strict";

const SOAJS_URL = process.env.SOAJS_URL;
const SOAJS_key = process.env.SOAJS_key;
const SOAJS_cd_auth = process.env.SOAJS_cd_auth;
const SOAJS_repo_auth = process.env.SOAJS_repo_auth;
const SOAJS_repo_tag = process.env.SOAJS_repo_tag;
const SOAJS_repo_commit = process.env.SOAJS_repo_commit;
const SOAJS_repo_branch = process.env.SOAJS_repo_branch;
const SOAJS_img_name = process.env.SOAJS_img_name;
const SOAJS_img_prefix = process.env.SOAJS_img_prefix;
const SOAJS_img_tag = process.env.SOAJS_img_tag;

let SOAJS_env_list;

const request = require("request");

let utils = {
	"init": function (cb) {
		console.log("Initializing CD script");
		
		if (!SOAJS_URL) {
			console.log("SOAJS_URL environment variable not found");
			process.exit(-1);
		}
		
		if (!SOAJS_key) {
			console.log("SOAJS_key environment variable not found");
			process.exit(-1);
		}
		
		if (!SOAJS_cd_auth) {
			console.log("SOAJS_cd_auth environment variable not found");
			process.exit(-1);
		}
		
		if (!SOAJS_repo_tag &&
			(!SOAJS_repo_commit || !SOAJS_repo_branch) &&
			(!SOAJS_img_name || !SOAJS_img_prefix || !SOAJS_img_tag)) {
			console.log("Missing CD Environment variable not found");
			process.exit(-1);
		}
		if (SOAJS_img_prefix || SOAJS_img_name) {
			if (!SOAJS_img_prefix || !SOAJS_img_name || !SOAJS_img_tag) {
				console.log("You can either set [SOAJS_img_tag] or [SOAJS_img_tag && SOAJS_img_prefix && SOAJS_img_name]");
				process.exit(-1);
			}
		}
		
		//example export SOAJS_env_list=dashboard,dev
		if (process.env.SOAJS_env_list) {
			try {
				SOAJS_env_list = process.env.SOAJS_env_list.split(',');
			}
			catch (e) {
				console.log("Malformed SOAJS_env_list environment variable!");
				process.exit(-1);
			}
		}
		console.log("Launching CD call...");
		utils.createRequest(function (params) {
			request.put(params, cb);
		});
	},
	
	"createRequest": function (cb) {
		let params = {};
		
		params.uri = SOAJS_URL;
		
		let soa;
		try {
			soa = require("./config.js");
		}
		catch (e) {
			try {
				soa = require("./soa.json");
			}
			catch (e) {
				console.log("soa.json file not found, make sure the CD script is on the same path as soa.json");
				process.exit(-1);
			}
		}
		
		if (soa.type === 'multi') {
			console.log("Service of type multi is not supported!");
			process.exit(-1);
		}
		params.qs = {
			token: SOAJS_cd_auth,
			repo_token: SOAJS_repo_auth,
			name: soa.serviceName || soa.name,
			type: soa.type || soa.type,
			version: soa.serviceVersion || soa.version,
		};
		params.body = {
			config: {
				from: {}
			}
		};
		
		if (SOAJS_repo_tag) {
			params.body.config.from.tag = SOAJS_repo_tag;
		}
		else if (SOAJS_repo_branch && SOAJS_repo_commit) {
			params.body.config.from.branch = SOAJS_repo_branch;
			params.body.config.from.commit = SOAJS_repo_commit;
		}
		
		if (SOAJS_img_tag) {
			params.body.config.from.image_tag = SOAJS_img_tag;
		}
		if (SOAJS_img_prefix) {
			params.body.config.from.image_prefix = SOAJS_img_prefix;
		}
		if (SOAJS_img_name) {
			params.body.config.from.image_name = SOAJS_img_name;
		}
		if (SOAJS_env_list) {
			params.body.config.from.env = SOAJS_env_list;
		}
		
		params.headers = {
			"key": SOAJS_key,
			"Content-Type": "application/json"
		};
		
		params.json = true;
		
		return cb(params);
	}
};


utils.init((err, response, body) => {
	if (err) {
		console.log(JSON.stringify(err, null, 2));
		process.exit(-1);
	}
	else {
		console.log(JSON.stringify(body, null, 2));
		if (!body || !body.result) {
			console.log("CD failed! for more information, check out notification under soajs console ...");
			process.exit(-1);
		}
	}
});
