function SimpleTree(options){
	var $tree=this.$tree=$("#"+options.id);
	this.options=options;
	
	$tree.addClass("simple_tree");
	
	for(var i=0;i<options.data.length;i++)
		this.addNode(options.data[i],$tree);
}
SimpleTree.prototype.addNode=function(node,$parent){
	if(node.hasChild || node.children){
		var html='<div class="simple_tree_node">'+node.text+'<img src="'+this.options.imgUrl[0]+'" name="arrow1"><img src="'+this.options.imgUrl[1]+'" name="arrow2"></div>';
		var $div=$(html);
		$div.appendTo($parent);
		$div.addEventListener("quickClick",$.proxy(function(e){
			var $node=$(e.currentTarget);
			
			if(!$node.hasClass("simple_tree_node_active"))
				this.activeNode($node);
			else
				this.inactiveNode($node);
			
			
		},this));
		
		html='<div class="simple_tree_node_panel"></div>';
		$div=$(html);
		$div.appendTo($parent);
		
		if(node.children){
			for(var i=0;i<node.children.length;i++)
				this.addNode(node.children[i],$div);
		}
	}else{
		var html='<div class="simple_tree_node">'+node.text+'<img src="'+this.options.imgUrl[2]+'"></div>';
		var $div=$(html);
		$div.appendTo($parent);
		$div.addEventListener("quickClick",$.proxy(function(e){
			var $node=$(e.currentTarget);
			
			this.activeNode($node);

			this.options.onclick.call(this,node);
		},this));
	}
}
SimpleTree.prototype.activeNode=function(node){
	if(typeof node == "string"){
		this.nodeSplit=this.nodeSplit||" ";
		var nodeTexts=node.split(this.nodeSplit);
		
		var $parent=this.$tree;
		for(var i=0;i<nodeTexts.length;i++){
			for(var m=0;m<$parent.children(".simple_tree_node").length;m++){
				var currentNode=$parent.children(".simple_tree_node:eq("+m+")");
				if(nodeTexts[i]==currentNode.text()){
					this.activeNode(currentNode);
					$parent=currentNode.next(".simple_tree_node_panel");
					break;
				}
			}
		}
	}else{
		var $node=node;
		var $nodepanel=$node.next(".simple_tree_node_panel");
		
		this.$tree.find(".simple_tree_node").removeClass("active_tree_node");
		$node.addClass("active_tree_node");
		
		if($nodepanel.length!=0){
			$node.parent().children(".simple_tree_node").removeClass("simple_tree_node_active");
			$node.addClass("simple_tree_node_active");
		
			$node.parent().children(".simple_tree_node_panel").css({"height":"0"});
			$nodepanel.css({"height":$nodepanel.find(".simple_tree_node").height()*$nodepanel.find(".simple_tree_node").length});
		}
	}
}
SimpleTree.prototype.inactiveNode=function(node){
	if(typeof node == "string"){
	
	}else{
		var $node=node;
		var $nodepanel=$node.next(".simple_tree_node_panel");
		
		$node.removeClass("active_tree_node");
		
		if($nodepanel.length!=0){
			$nodepanel.css({"height":"0"});
			$node.removeClass("simple_tree_node_active");
		}
	}
}
SimpleTree.prototype.reset=function(){
	this.$tree.find(".simple_tree_node").removeClass("active_tree_node").removeClass("simple_tree_node_active");
	this.$tree.find(".simple_tree_node_panel").css({"height":"0"});
}