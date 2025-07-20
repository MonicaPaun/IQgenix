const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const toolSelect = document.getElementById("toolSelect");
const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");
const colorPicker = document.getElementById("colorPicker");

let isDrawing = false, startX = 0, startY = 0;
let paths = [], redoStack = [];
let backgroundColor = "#ffffff";
let tempPath = null;

sizeSlider.addEventListener("input", () => sizeValue.textContent = sizeSlider.value);

canvas.addEventListener("mousedown", (e) => {
  const pos = getMousePos(e);
startX = pos.x;
startY = pos.y;
  const tool = toolSelect.value;
  startX = e.offsetX;
  startY = e.offsetY;

 if (tool === 'fillCanvas') {
  // Salvează snapshot-ul complet
  redoStack = [];
  paths.push({ type: 'snapshot', data: JSON.parse(JSON.stringify(paths)), bg: backgroundColor });

  backgroundColor = colorPicker.value;
  paths.push({ type: 'fillCanvas', color: backgroundColor });
  redrawCanvas();
  return;
}

if (tool === 'fillShape') {
  const shapeData = getShapeAtPointWithIndex(startX, startY);
  if (shapeData) {
    const { shape, index } = shapeData;
    redoStack = [];
    paths.push({ type: 'snapshot', data: JSON.parse(JSON.stringify(paths)), bg: backgroundColor });

    shape.fill = colorPicker.value;
    paths.push({ type: 'fillShape', shapeIndex: index, color: colorPicker.value });
    redrawCanvas();
  }
  return;
}



  isDrawing = true;
  redoStack = [];

  if (tool === 'pencil' || tool === 'eraser') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    paths.push({ tool, color: getColor(), size: getSize(), points: [{ x: startX, y: startY }], fill: null });
  } else {
    tempPath = { tool, color: getColor(), size: getSize(), startX, startY, endX: startX, endY: startY, fill: null };
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const tool = toolSelect.value;

  if (tool === 'pencil' || tool === 'eraser') {
    let lastPath = paths[paths.length - 1];
    lastPath.points.push({ x: e.offsetX, y: e.offsetY });
    redrawCanvas();
    drawPath(lastPath);
  } else {
    tempPath.endX = e.offsetX;
    tempPath.endY = e.offsetY;
    redrawCanvas();
    drawShape(tempPath, true);
  }
});
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  const pos = getTouchPos(touch);
  startX = pos.x;
  startY = pos.y;

  const tool = toolSelect.value;

  if (tool === 'fillCanvas') {
    redoStack = [];
    paths.push({ type: 'snapshot', data: JSON.parse(JSON.stringify(paths)), bg: backgroundColor });
    backgroundColor = colorPicker.value;
    paths.push({ type: 'fillCanvas', color: backgroundColor });
    redrawCanvas();
    return;
  }

  if (tool === 'fillShape') {
    const shapeData = getShapeAtPointWithIndex(startX, startY);
    if (shapeData) {
      const { shape, index } = shapeData;
      redoStack = [];
      paths.push({ type: 'snapshot', data: JSON.parse(JSON.stringify(paths)), bg: backgroundColor });
      shape.fill = colorPicker.value;
      paths.push({ type: 'fillShape', shapeIndex: index, color: colorPicker.value });
      redrawCanvas();
    }
    return;
  }

  isDrawing = true;
  redoStack = [];

  if (tool === 'pencil' || tool === 'eraser') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    paths.push({ tool, color: getColor(), size: getSize(), points: [{ x: startX, y: startY }], fill: null });
  } else {
    tempPath = { tool, color: getColor(), size: getSize(), startX, startY, endX: startX, endY: startY, fill: null };
  }
});

canvas.addEventListener("touchmove", (e) => {
  if (!isDrawing) return;
  e.preventDefault(); // previne scrollul
  const touch = e.touches[0];
  const pos = getTouchPos(touch);
  const tool = toolSelect.value;

  if (tool === 'pencil' || tool === 'eraser') {
    let lastPath = paths[paths.length - 1];
    lastPath.points.push({ x: pos.x, y: pos.y });
    redrawCanvas();
    drawPath(lastPath);
  } else {
    tempPath.endX = pos.x;
    tempPath.endY = pos.y;
    redrawCanvas();
    drawShape(tempPath, true);
  }
});

canvas.addEventListener("touchend", () => {
  if (!isDrawing) return;
  isDrawing = false;
  if (tempPath) {
    paths.push({ ...tempPath });
    tempPath = null;
  }
  redrawCanvas();
});

canvas.addEventListener("mouseup", () => {
  if (!isDrawing) return;
  isDrawing = false;
  if (tempPath) {
    paths.push({ ...tempPath });
    tempPath = null;
  }
  redrawCanvas();
});

function getColor() {
  return toolSelect.value === 'eraser' ? '#ffffff' : colorPicker.value;
}

function getSize() {
  return parseInt(sizeSlider.value);
}

function drawPath(p) {
  ctx.strokeStyle = p.color;
  ctx.lineWidth = p.size;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i < p.points.length - 1; i++) {
    ctx.moveTo(p.points[i].x, p.points[i].y);
    ctx.lineTo(p.points[i + 1].x, p.points[i + 1].y);
  }
  ctx.stroke();
if (p.fill) {
  ctx.fillStyle = p.fill;
  ctx.beginPath();
  ctx.moveTo(p.points[0].x, p.points[0].y);
  for (let i = 1; i < p.points.length; i++) {
    ctx.lineTo(p.points[i].x, p.points[i].y);
  }
  ctx.closePath();
  ctx.fill();
}

}

function drawShape(p, isPreview = false) {
  ctx.strokeStyle = p.color;
  ctx.lineWidth = p.size;
  ctx.lineCap = "round";
  if (p.fill) ctx.fillStyle = p.fill;

  const x = Math.min(p.startX, p.endX);
  const y = Math.min(p.startY, p.endY);
  const w = Math.abs(p.endX - p.startX);
  const h = Math.abs(p.endY - p.startY);
  const size = Math.min(w, h);

  ctx.beginPath();

  switch(p.tool) {
    case 'line':
      ctx.moveTo(p.startX, p.startY);
      ctx.lineTo(p.endX, p.endY);
      ctx.stroke();
      break;
    case 'rect':
      ctx.strokeRect(x, y, w, h);
      if (p.fill) ctx.fillRect(x, y, w, h);
      break;
    case 'circle':
      ctx.arc(x + w/2, y + h/2, size / 2, 0, Math.PI * 2);
      ctx.stroke();
      if (p.fill) ctx.fill();
      break;
    case 'star':
      drawStar(ctx, x + w/2, y + h/2, 5, size / 2, size / 4);
      ctx.stroke();
      if (p.fill) ctx.fill();
      break;
    case 'diamond':
      drawDiamond(ctx, x + w/2, y + h/2, w, h);
      ctx.stroke();
      if (p.fill) ctx.fill();
      break;
    case 'heart':
      drawHeart(ctx, x + w/2, y + h/2 - size / 4, size);
      ctx.stroke();
      if (p.fill) ctx.fill();
      break;
    case 'robot':
      drawRobot(ctx, x + w/2, y + h/2, size);
      ctx.stroke();
      if (p.fill) ctx.fill();
      break;
    case 'tree':
      drawTree(ctx, x + w/2, y + h/2, size);
      ctx.stroke();
      if (p.fill) ctx.fill();
      break;
    case 'sun':
      drawSun(ctx, x + w/2, y + h/2, size);
      ctx.stroke();
      if (p.fill) ctx.fill();
      break;
  }
}

function redrawCanvas() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let p of paths) {
    if (p.type === 'fillCanvas') {
      backgroundColor = p.color;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (p.type === 'fillShape') {
      // actualizare fill pe forma țintă
      const shape = paths[p.shapeIndex];
      if (shape) {
        shape.fill = p.color;
      }
    } else if (p.tool === 'pencil' || p.tool === 'eraser') {
      drawPath(p);
    } else {
      drawShape(p);
    }
  }
}

function getShapeAtPoint(x, y) {
  // căutare în ordinea inversă (top to bottom)
  for (let i = paths.length - 1; i >= 0; i--) {
    const p = paths[i];
    if (p.tool && p.tool !== 'pencil' && p.tool !== 'eraser' && !p.type) {
      const minX = Math.min(p.startX, p.endX);
      const maxX = Math.max(p.startX, p.endX);
      const minY = Math.min(p.startY, p.endY);
      const maxY = Math.max(p.startY, p.endY);
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) return p;
    } else if (p.tool === 'pencil') {
      // verificare punct apropiat pentru pencil - simplu bounding box aprox
      let xs = p.points.map(pt => pt.x);
      let ys = p.points.map(pt => pt.y);
      let minX = Math.min(...xs);
      let maxX = Math.max(...xs);
      let minY = Math.min(...ys);
      let maxY = Math.max(...ys);
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) return p;
    }
  }
  return null;
}

// Forme complexe:

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx, y = cy;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;
    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.closePath();
}

function drawDiamond(ctx, cx, cy, width, height) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - height / 2);
  ctx.lineTo(cx + width / 2, cy);
  ctx.lineTo(cx, cy + height / 2);
  ctx.lineTo(cx - width / 2, cy);
  ctx.closePath();
}

function drawHeart(ctx, x, y, size) {
  const topCurveHeight = size * 0.3;
  const width = size, height = size;
  ctx.beginPath();
  ctx.moveTo(x, y + height / 4);
  ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x - width / 2, y + height / 2, x, y + height * 0.75, x, y + height);
  ctx.bezierCurveTo(x, y + height * 0.75, x + width / 2, y + height / 2, x + width / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + height / 4);
  ctx.closePath();
}

// Desen robot simplu contur
function drawRobot(ctx, cx, cy, size) {
  const half = size / 2;
  ctx.beginPath();
  // corp
  ctx.rect(cx - half * 0.6, cy - half * 0.4, half * 1.2, half * 0.8);
  // cap
  ctx.rect(cx - half * 0.4, cy - half * 1, half * 0.8, half * 0.6);
  // ochi
  ctx.moveTo(cx - half * 0.2, cy - half * 0.8);
  ctx.arc(cx - half * 0.25, cy - half * 0.8, half * 0.08, 0, Math.PI * 2);
  ctx.moveTo(cx + half * 0.2, cy - half * 0.8);
  ctx.arc(cx + half * 0.25, cy - half * 0.8, half * 0.08, 0, Math.PI * 2);
  // antena
  ctx.moveTo(cx, cy - half * 1);
  ctx.lineTo(cx, cy - half * 1.2);
  ctx.stroke();
}

// Desen copac simplu contur
function drawTree(ctx, cx, cy, size) {
  const trunkWidth = size * 0.2;
  const trunkHeight = size * 0.4;
  const foliageRadius = size * 0.4;

  ctx.beginPath();
  // trunchi
  ctx.rect(cx - trunkWidth / 2, cy + trunkHeight / 2, trunkWidth, trunkHeight);
  // coroana (cerc)
  ctx.moveTo(cx + foliageRadius, cy);
  ctx.arc(cx, cy, foliageRadius, 0, Math.PI * 2);
  ctx.stroke();
}

// Desen soare simplu contur
function drawSun(ctx, cx, cy, size) {
  const radius = size / 3;
  const spikes = 12;
  const spikeLength = radius / 2;

  ctx.beginPath();
  // cerc central
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  // raze
  for (let i = 0; i < spikes; i++) {
    const angle = (i * 2 * Math.PI) / spikes;
    const xStart = cx + Math.cos(angle) * radius;
    const yStart = cy + Math.sin(angle) * radius;
    const xEnd = cx + Math.cos(angle) * (radius + spikeLength);
    const yEnd = cy + Math.sin(angle) * (radius + spikeLength);
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
  }
  ctx.stroke();
}

function undo() {
  if (paths.length === 0) return;

  const last = paths.pop();

  if (last.type === 'snapshot') {
    // La undo unui snapshot, salvează starea curentă completă în redo
    redoStack.push({ type: 'snapshot', data: JSON.parse(JSON.stringify(paths)), bg: backgroundColor });

    // Restaurează starea din snapshot
    paths = last.data;
    backgroundColor = last.bg;
  } else {
    redoStack.push(last);
  }

  redrawCanvas();
}

function redo() {
  if (redoStack.length === 0) return;

  const last = redoStack.pop();

  if (last.type === 'snapshot') {
    // La redo unui snapshot, salvează starea curentă completă în undo
    paths.push({ type: 'snapshot', data: JSON.parse(JSON.stringify(paths)), bg: backgroundColor });

    // Restaurează starea din snapshot
    paths = last.data;
    backgroundColor = last.bg;
  } else {
    paths.push(last);
  }

  redrawCanvas();
}


function clearCanvas() {
  const confirmed = confirm("Ești sigur că vrei să ștergi tot? Nu vei putea recupera ce ștergi!");
  if (!confirmed) return;
  paths = [];
  redoStack = [];
  backgroundColor = "#ffffff";
  redrawCanvas();
}

function saveImage() {
  const link = document.createElement('a');
  link.download = 'desen.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

redrawCanvas();

function getShapeAtPointWithIndex(x, y) {
  for (let i = paths.length - 1; i >= 0; i--) {
    const p = paths[i];
    if (p.tool && p.tool !== 'pencil' && p.tool !== 'eraser' && !p.type) {
      const minX = Math.min(p.startX, p.endX);
      const maxX = Math.max(p.startX, p.endX);
      const minY = Math.min(p.startY, p.endY);
      const maxY = Math.max(p.startY, p.endY);
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) return { shape: p, index: i };
    } else if (p.tool === 'pencil') {
      let xs = p.points.map(pt => pt.x);
      let ys = p.points.map(pt => pt.y);
      let minX = Math.min(...xs);
      let maxX = Math.max(...xs);
      let minY = Math.min(...ys);
      let maxY = Math.max(...ys);
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) return { shape: p, index: i };
    }
  }
  return null;
}
// Ajustează dimensiunea canvas-ului fizic la dimensiunea CSS pentru a evita probleme de scalare mouse
function resizeCanvasToDisplaySize(canvas) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

resizeCanvasToDisplaySize(canvas);

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.round((evt.clientX - rect.left) * (canvas.width / rect.width)),
    y: Math.round((evt.clientY - rect.top) * (canvas.height / rect.height))
  };
}

function getTouchPos(touch) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.round((touch.clientX - rect.left) * (canvas.width / rect.width)),
    y: Math.round((touch.clientY - rect.top) * (canvas.height / rect.height))
  };
}
const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu-list');

  btn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
   // Obține numele paginii curente
  const currentPage = window.location.pathname.split("/").pop();

  // Selectează toate linkurile din meniu
  const menuLinks = document.querySelectorAll("#menu-list a");

  menuLinks.forEach(link => {
    // Compară href-ul fiecărui link cu pagina curentă
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });