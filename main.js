function DRILLRPM() {
  document.querySelector(".a").hidden = true;
  document.querySelector(".b").hidden =false;
  document.querySelector(".pop").innerText = " DRILL RPM";
  
  document.querySelector("label").hidden =false;
}


function RPM() {
  let dia = parseFloat(document.getElementById("num").value); // Convert to number
  document.querySelector(".rpmprint").innerText = "S" + (4777 / dia);
}



function back() {
  document.querySelector(".a").hidden =false;
  document.querySelector("label").hidden =true;
  document.querySelector(".b").hidden =true;
}


function DRILL() {
  document.querySelector(".a").hidden = true;
  document.querySelector(".c").hidden =false;
  document.querySelector(".pop").innerText = " DRILL RPM";
  
  document.querySelector("label").hidden =false;
}


function Applybtn() {
  let dim = parseFloat(document.getElementById("dim").value);
  let depth = parseFloat(document.getElementById("deep").value);
  let rpm = parseFloat(document.getElementById("srpm").value);
  let peak = parseFloat(document.getElementById("peak").value);
  
  document.querySelector(".c").hidden =true;
  

  if (isNaN(dim) || isNaN(depth) || isNaN(rpm) || isNaN(peak)) {
    document.querySelector(".codeprint").innerText = "Invalid input!";
    return;
  }

  // X, Y starting position (assume center)
  let x = 0, y = 0;
  let r = 2, q = 2;

  // Generating Drilling Cycle (Simple G-code)
  let gcode = `
  (Drilling Cycle Diameter ${dim})
  G00 G91 G28 Z0.0  ;
  G90 G54 G80 G40 G21;
  G0 X${x} Y${y} S${rpm} M3 ; 
  Z100 M08; 
  G98 G83 X${x} Y${y} Z-${depth} R${r} Q${peak} F40 ;
  G80   ;
  M30    ; 
  `;

  // Show G-code in the webpage
  document.querySelector(".codeprint").innerText = gcode;
  
  downloadGCode("Interpolation_GCode.txt", gcode);
}
function back() {
  document.querySelector(".a").hidden =false;
  document.querySelector("label").hidden =true;
  document.querySelector(".c").hidden =true;
  document.querySelector(".b").hidden =true;
}


function INTERP() {
  document.querySelector(".a").hidden = true;
  document.querySelector(".d").hidden =false;
  document.querySelector(".pop").innerText = "Interpolation";
  
  document.querySelector("label").hidden =false;
}
function back() {
  document.querySelector(".a").hidden =false;
  document.querySelector("label").hidden =true;
  document.querySelector(".c").hidden =true;
  document.querySelector(".b").hidden =true;
  document.querySelector(".d").hidden =true;
}


function Applyinterp() {
  let hd = parseFloat(document.getElementById("hd").value);
  let cd = parseFloat(document.getElementById("cd").value);
  let deep = parseFloat(document.getElementById("indeep").value);
  let z = parseFloat(document.getElementById("inz").value);
  let f = parseFloat(document.getElementById("inf").value);
  
  document.querySelector(".d").hidden =true;
  
  if (isNaN(hd) || isNaN(cd) || isNaN(deep) || isNaN(z) || isNaN(f)) {
    document.querySelector(".codeprint2").innerText = "Invalid input!";
    return;
  }
  
  let a = (hd / 2);
  let b = (cd / 2);
  let x = (a - b);
  let y = 0;
  let p = (deep / z);
  
  let gcode2 = `
  (interpolation);
  N1 G00 G91 G28 Z0.0  ;
  N2 G90 G54 G80 G40 G21;(Diameter ${hd})
  N3 G0 X${x} Y${y}  M3 ; 
  N4 Z100 M08; 
  N5 G01 Z0.0 F1000 ;
  N6 G03  I-${x} Z-${deep} P${p} F${f} ;
  N7 G03  I-${x}  F${f} ;
  N8 G01 Z100 F1000 ;
  N9 M09 ;
  N10 M05 ;
  N11 M30 ; 
  `;
  
  document.querySelector(".codeprint2").innerText = gcode2;
  
  downloadGCode("Interpolation_GCode.txt", gcode2);
}

function downloadGCode(filename, content) {
  let blob = new Blob([content], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
