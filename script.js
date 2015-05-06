

$(document).ready(function()
{
	var boxesPerLine = 16;
	var selectedStyle = "basic";
	var redValue;
	var greenValue;
	var blueValue;
	var phase = 1;
			
	DrawGrid(boxesPerLine);
		

	function DrawGrid(howManyBoxes)
	{
		var i;
		var j;

		for (j = 0; j<(howManyBoxes); j++)
		{
			for (i = 0; i<(howManyBoxes); i++)
			{
				var newBox = document.createElement("div")
				newBox.style.width = ((600 / howManyBoxes) + "px");
				newBox.style.height = ((600 / howManyBoxes) + "px");
				newBox.className = "etchbox";
				newBox.addEventListener("mouseenter", MouseEnterFunction);
				document.getElementById("etchbox-container").appendChild(newBox);
			}
			var newDivisionBox = document.createElement("div");
			newDivisionBox.className = "divisionbox";
			document.getElementById("etchbox-container").appendChild(newDivisionBox);

		}
	}
	function MouseEnterFunction()
	{
		if (selectedStyle == "basic")
		{
			$(this).addClass("blackbox");
		}
		else if (selectedStyle == "grayscale")//not working
		{
			$(this).addClass("blackbox");

			var opacity = this.style.opacity;
    		this.style.opacity = opacity ? (parseFloat(opacity) + 0.1) : 0.2;
		}
		else if (selectedStyle == "random")
		{
			redValue = Math.floor(Math.random() * 256);
			greenValue = Math.floor(Math.random() * 256);
			blueValue = Math.floor(Math.random() * 256);
			this.style.backgroundColor = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
		}
		else if (selectedStyle == "rainbow")//declare redvalue and greenvalue globally
		{
			if (phase == 1)
			{
				greenValue += 5;
				if (greenValue > 250)
				{
					phase = 2;
				}
			}

			else if (phase == 2)
			{
				redValue -= 5;
				if (redValue < 10)
				{
					phase = 3;
				}
			}

			else if (phase == 3)
			{
				greenValue -= 5;
				blueValue += 5;
				if (greenValue < 10)
				{
					phase = 4;
				}
			}
			else 
			{
				blueValue -= 5;
				redValue += 5;
				if (blueValue < 10)
				{
					phase = 1;
				}
			 }
			this.style.backgroundColor = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
		}
	}

	

	$("#basicbutton").click(function()
	{
		selectedStyle = "basic";
		RedrawGrid();

	})
	$("#grayscalebutton").click(function()
	{
		selectedStyle = "grayscale";
		RedrawGrid();
		
	})
	$("#randombutton").click(function()
	{
		selectedStyle = "random";
		RedrawGrid();

	})
	$("#rainbowbutton").click(function()
	{
		selectedStyle = "rainbow";
		redValue = 255;
		greenValue = 0;
		blueValue = 0;
		RedrawGrid();
	})

	$("#sizebutton").click(function()
	{
		boxesPerLine = prompt("How many boxes on a side?");
		RedrawGrid();
	})

	function RedrawGrid()
	{
		$(".etchbox").remove();
		$(".divisionbox").remove();
		DrawGrid(boxesPerLine);
	}
})


