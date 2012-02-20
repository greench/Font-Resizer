window.addEventListener('DOMContentLoaded',function(){
	//This function obtains two parameter, which one is how many times loop turns. The other is used for calculating new font size.
	var fontSizer			=	function(multipler,count){
	 	// Select all children on the DOM in order to recalculate font size of them
	 	var children	=	document.querySelectorAll("*");

		// Apply new font size to all children
		for(i=0,limit=children.length;i<limit;i++){

			//  Build a cache of the current child in order to execute operations faster
			var child					=	children[i];

			// If the element has child
			if(child.childElementCount!=0){
				// For each child, check node type
				for(k=0,
					flag=false,
					k_limit=child.childNodes.length,
					pushedElements=[],
					gul=child.childNodes;
					k<k_limit;
					k++){
						// If node type is a HTML element and node type hasn't white spaces, fire flag
						if((gul.item(k).nodeType==3 && gul.item(k).isElementContentWhitespace==false)){//  || (gul.item(k).tagName=="SCRIPT") || (gul.item(k).tagName=="BR") || (gul.item(k).tagName=="IMG")){
							flag=true;
						}else{
							pushedElements.push(k);
						}
					}
				if(flag==false){
					continue;
				}else{
					//opera.postError(pushedElements);
					for(standardizedElements in pushedElements){
						//opera.postError(standardizedElements);
						
						if(typeof(gul.item(pushedElements[standardizedElements]).tagName)!=undefined && gul.item(pushedElements[standardizedElements]).nodeType!=3){//  || (gul.item(pushedElements[standardizedElements]).tagName!="SCRIPT") || (gul.item(pushedElements[standardizedElements]).tagName!="BR") || (gul.item(pushedElements[standardizedElements]).tagName!="IMG")){
							//opera.postError(gul.item(pushedElements[standardizedElements]).tagName);
							var stdFontSize = document.createAttribute('fontSizer');
							try {
								stdFontSize.nodeValue = parseInt(document.defaultView.getComputedStyle(gul.item(pushedElements[standardizedElements]),null).getPropertyValue('font-size'));
							} catch(errorValue) {
								//opera.postError(errorValue);
							  	stdFontSize.nodeValue=1;
							}
							try {
								gul.item(pushedElements[standardizedElements]).attributes.setNamedItem(stdFontSize);
							} catch(errorValue) {
								//opera.postError("1"+errorValue);
							  	//stdFontSize.nodeValue=1;
							}							
							
						}
					}
				}

			}

			// Calculate new font size value
			var oldsize		=	child.attributes.getNamedItem("fontSizer")==null?parseInt(document.defaultView.getComputedStyle(child,null).getPropertyValue('font-size')):child.attributes.getNamedItem("fontSizer").nodeValue;

			// Find 'coefficient' value that is a new multipler value for multiple zoomed pages.
			for(k_count=1;k_count<=count /*|| k_count==1*/;k_count++/*,oldsize*=multipler*/){
				// Apply the font size to the child
				//opera.postError("k_count:"+k_count+" |count: "+count+" oldsize:"+oldsize);
				oldsize		=	(multipler>1)?Math.floor(oldsize*multipler):Math.ceil(oldsize*multipler);
			}
				child.style.fontSize		=	oldsize+"px";
		}
	}

     window.addEventListener('keydown',function(event){
	    if((event.keyCode==38 || event.keyCode==40 || event.keyCode==36) && event.target.nodeName!="INPUT" && event.ctrlKey && event.shiftKey){
	    	event.preventDefault();
	    	if(typeof(defaultSize)=="undefined"){
				defaultSize		=	window.localStorage.getItem("fontSizer");
				defaultSize		=	defaultSize==null?0:defaultSize;
	    	}
	    	switch(event.keyCode){
	    		case 38: // Increase default size
	    		fontSizer(1.1,1);
	    		if(++defaultSize!=0){
	    		window.localStorage.setItem("fontSizer",defaultSize);}
	    		else{
	    		window.localStorage.removeItem("fontSizer");}
	    		break;
	    		case 40: // Decrease font size
	    		fontSizer(1/1.1,1);
	    		if(--defaultSize!=0){
	    		window.localStorage.setItem("fontSizer",defaultSize);}
	    		else{
	    		window.localStorage.removeItem("fontSizer");}
	    		break;
	    		case 36: // To resize default font size
	    		var defaultSize	= window.localStorage.getItem("fontSizer");
	    		if(defaultSize!=null){
	    			if(defaultSize>0){
						fontSizer(1/1.1,defaultSize);}
					else{ if(defaultSize<0)
						fontSizer(1.1,-defaultSize);}
					defaultSize=0;
					window.localStorage.removeItem("fontSizer");
					/*
					if(window.localStorage.getItem("fontSizer")>0){
	   					for(count=0,defLim=window.localStorage.getItem("fontSizer");count<defLim;count++)
							fontSizer(1/1.1);
					}else { if(window.localStorage.getItem("fontSizer")<0)
						for(count=0,defLim=-window.localStorage.getItem("fontSizer");count<defLim;count++)
							fontSizer(1.1);}
					defaultSize=0;
					window.localStorage.setItem("fontSizer",defaultSize);

					*/
					}
				break;
	    	}

	    }
     },false);

     var defaultSize		=	window.localStorage.getItem("fontSizer");
	 if(defaultSize!=null){
		 if(defaultSize>0){
		 	fontSizer(1.1,defaultSize);
		 }else if(defaultSize<0)
		 	fontSizer(1/1.1,-defaultSize);
	 }
},false);

