function calculateLoad() {
  const deviceName = document.getElementById("deviceName").value || "Device";
  const powerPerDevice = parseFloat(document.getElementById("deviceWattage").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const cableSize = parseFloat(document.getElementById("cableSize").value);
  const cableLength = parseFloat(document.getElementById("cableLength").value);
  const plugType = parseInt(document.getElementById("plugType").value);

  if (isNaN(powerPerDevice) || isNaN(quantity)) {
    document.getElementById("result").innerHTML = "❗ Please enter valid numbers for power and quantity.";
    return;
  }

  const totalPower = powerPerDevice * quantity;
  const currentDraw = totalPower / 230;
  const maxCurrent = plugType;

  let cableLimit;
  if (cableSize === 1.5) cableLimit = 15;
  else if (cableSize === 2.5) cableLimit = 20;
  else if (cableSize === 4) cableLimit = 25;
  else cableLimit = 0;

  const voltDropPerAmpPerM = (cableSize === 1.5) ? 0.03 :
                             (cableSize === 2.5) ? 0.018 :
                             (cableSize === 4) ? 0.011 : 0;
  const voltDrop = currentDraw * cableLength * voltDropPerAmpPerM;
  const endVoltage = 230 - voltDrop;
  const voltageDropSafe = voltDrop < 11.5;

  const isSafe = currentDraw <= cableLimit && currentDraw <= maxCurrent && voltageDropSafe;

  let result = `<strong>${deviceName} × ${quantity}</strong><br>`;
  result += `🔌 Total Load: <strong>${totalPower.toFixed(0)} W</strong><br>`;
  result += `⚡ Estimated Current: <strong>${currentDraw.toFixed(1)} A</strong><br>`;
  result += `🧵 Cable Limit: ${cableLimit} A | 🔌 Plug Limit: ${maxCurrent} A<br>`;
  result += `🔻 Voltage Drop: ${voltDrop.toFixed(1)} V (→ ${endVoltage.toFixed(1)} V at load)<br><br>`;

  result += isSafe
    ? `<span style="color: limegreen; font-weight: bold;">✅ Safe to run on this cable</span>`
    : `<span style="color: red; font-weight: bold;">❌ Overload or voltage drop risk — split the load</span>`;

  document.getElementById("result").innerHTML = result;
}

function resetForm() {
  document.getElementById("deviceName").value = "";
  document.getElementById("deviceWattage").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("cableSize").value = "2.5";
  document.getElementById("cableLength").value = "10";
  document.getElementById("plugType").value = "16";
  document.getElementById("presetDevice").value = "";
  document.getElementById("result").innerHTML = "";
}

function applyPreset() {
  const preset = document.getElementById("presetDevice").value;
  if (!preset) return;
  const [name, wattage] = preset.split(",");
  document.getElementById("deviceName").value = name;
  document.getElementById("deviceWattage").value = wattage;
}

function exportToCSV() {
  const result = document.getElementById("result").innerText;
  const blob = new Blob([result], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "cablecalc_result.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}