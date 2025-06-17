function calculateTotalLoad() {
  const cableSize = parseFloat(document.getElementById("cableSize").value);
  const cableLength = parseFloat(document.getElementById("cableLength").value);
  const plugType = parseInt(document.getElementById("plugType").value);

  let totalPower = 0;
  let summary = "";

  document.querySelectorAll("#deviceList tbody tr").forEach((row, i) => {
    const nameInput = row.querySelector(".name");
    const name = nameInput ? nameInput.value : "Device";
    const watt = parseFloat(row.querySelector(".watt").value);
    const qty = parseInt(row.querySelector(".qty").value);

    if (!isNaN(watt) && !isNaN(qty)) {
      const power = watt * qty;
      totalPower += power;
      summary += `${name} × ${qty} = ${power}W<br>`;
    }
  });

  const currentDraw = totalPower / 230;
  const cableLimit = cableSize === 1.5 ? 15 : cableSize === 2.5 ? 20 : 25;
  const voltDropPerAmpPerM = cableSize === 1.5 ? 0.03 : cableSize === 2.5 ? 0.018 : 0.011;
  const voltDrop = currentDraw * cableLength * voltDropPerAmpPerM;
  const endVoltage = 230 - voltDrop;
  const voltageDropSafe = voltDrop < 11.5;
  const isSafe = currentDraw <= cableLimit && currentDraw <= plugType && voltageDropSafe;

  let result = `<strong>Total Load Summary:</strong><br>${summary}`;
  result += `Total Power: <strong>${totalPower.toFixed(0)} W</strong><br>`;
  result += `Estimated Current: ${currentDraw.toFixed(1)} A<br>`;
  result += `Cable Limit: ${cableLimit} A | Plug Limit: ${plugType} A<br>`;
  result += `Voltage Drop: ${voltDrop.toFixed(1)} V → ${endVoltage.toFixed(1)} V<br><br>`;

  if (isSafe) {
    result += `<span style="color: limegreen; font-weight: bold;">✅ Safe to run</span>`;
  } else {
    result += `<span style="color: red; font-weight: bold;">❌ Overload or voltage drop risk</span><br><br>`;
    result += `<div style="background: #2a2a2a; padding: 10px; border: 1px solid #444; border-radius: 5px;">`;
    result += `<strong>Suggested Fixes:</strong>`;
    result += `<ul style="margin-top: 0.5em; padding-left: 1.2em; color: #f1f1f1;">`;

    if (currentDraw > plugType) {
      result += `<li>Use a higher-rated plug (e.g., 32A instead of ${plugType}A)</li>`;
    }
    if (currentDraw > cableLimit) {
      result += `<li>Use a thicker cable (e.g., 4mm² instead of ${cableSize}mm²)</li>`;
    }
    if (!voltageDropSafe) {
      result += `<li>Shorten the cable length or increase the cable size to reduce voltage drop</li>`;
    }

    result += `</ul></div>`;
  }

  console.log("DEBUG:");
  console.log("Current Draw:", currentDraw.toFixed(2), "A");
  console.log("Cable Limit:", cableLimit, "A");
  console.log("Plug Limit:", plugType, "A");
  console.log("Voltage Drop:", voltDrop.toFixed(2), "V");
  console.log("Voltage Drop Safe:", voltageDropSafe);
  console.log("Safe Status:", isSafe);

  document.getElementById("result").innerHTML = result;
}