define(["ember"], function(Ember){

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.glyph || (depth0 && depth0.glyph),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "home", options) : helperMissing.call(depth0, "glyph", "home", options))));
  data.buffer.push("\n			");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.glyph || (depth0 && depth0.glyph),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "th", options) : helperMissing.call(depth0, "glyph", "th", options))));
  data.buffer.push("\n			");
  return buffer;
  }

  data.buffer.push("<div class=\"container\">\n	<ul class=\"nav nav-pills\">\n		<li>\n			");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</li>\n		<li>\n			");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "keypad", options) : helperMissing.call(depth0, "link-to", "keypad", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</li>\n	</ul>\n</div>\n");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "body", options) : helperMissing.call(depth0, "outlet", "body", options))));
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n					<div class=\"btn-group\">\n						<button class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tivoIRCommand", "cmd", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n							<span class=\"glyphicon glyphicon-");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "icon", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></span>\n						</button>\n					</div>\n				");
  return buffer;
  }

  data.buffer.push("<div class=\"container index-page\">\n	<div class=\"row\">\n		<div class=\"col-xs-12\">\n			<div class=\"btn-group btn-group-justified\">\n				<div class=\"btn-group\">\n					<button class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "decrease", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n						");
  data.buffer.push(escapeExpression((helper = helpers.glyph || (depth0 && depth0.glyph),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "minus", options) : helperMissing.call(depth0, "glyph", "minus", options))));
  data.buffer.push("\n					</button>\n				</div>\n				<div class=\"btn-group\">\n					<span class=\"btn btn-default\">");
  stack1 = helpers._triageMustache.call(depth0, "displayVolume", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n				</div>\n				<div class=\"btn-group\">\n					<button class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "increase", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n						");
  data.buffer.push(escapeExpression((helper = helpers.glyph || (depth0 && depth0.glyph),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "plus", options) : helperMissing.call(depth0, "glyph", "plus", options))));
  data.buffer.push("\n					</button>\n				</div>\n			</div>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"col-xs-12\">\n			<div class=\"btn-group btn-group-justified\">\n				");
  stack1 = helpers.each.call(depth0, "directionalButtons", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"col-xs-6\">\n			<button class=\"btn btn-block btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tivoIRCommand", "EXIT", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(">Exit</button>\n		</div>\n		<div class=\"col-xs-6\">\n			<button class=\"btn btn-block btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tivoIRCommand", "SELECT", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(">Select</button>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"col-xs-6\">\n			<button class=\"btn btn-block btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tivoIRCommand", "GUIDE", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(">Guide</button>\n		</div>\n		<div class=\"col-xs-6\">\n			<button class=\"btn btn-block btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tivoIRCommand", "TIVO", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(">TiVo</button>\n		</div>\n	</div>\n</div>\n\n\n\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["keypad"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n				<div data-num=\"");
  stack1 = helpers._triageMustache.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "pressedKey", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n					<span>");
  stack1 = helpers._triageMustache.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n				</div>\n				");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n				<div class=\"channel-entry row\">\n					<div class=\"col-xs-7 col-xs-offset-1\">\n						<span class=\"current-sequence btn btn-lg btn-primary btn-block\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeChannel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n							Go to ");
  stack1 = helpers._triageMustache.call(depth0, "currentSequence", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n						</span>\n					</div>\n					<div class=\"col-xs-3\">\n						<span class=\"clear-sequence btn btn-danger btn-block btn-lg\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clearSequence", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">&cross;</span>\n					</div>\n				</div>\n			");
  return buffer;
  }

  data.buffer.push("<div class=\"container\">\n	<div class=\"row\">\n		<div class=\"col-md-12\">\n			<div class=\"keypad\">\n				");
  stack1 = helpers.each.call(depth0, "numberedKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n			");
  stack1 = helpers['if'].call(depth0, "currentSequence", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</div>\n	</div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["loading"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<p>Loading...</p>");
  
});

});