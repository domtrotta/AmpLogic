function calculateTotalLoad() {
  const cableSize = parseFloat(document.getElementById("cableSize").value);
  const cableLength = parseFloat(document.getElementById("cableLength").value);
  const plugType = parseInt(document.getElementById("plugType").value);

  let totalPower = 0;
  let summary = "";

  document.querySelectorAll(".device-entry").forEach(entry => {
    const id = entry.id.split("-")[1];
    const name = document.getElementById(`name-${id}`).value || "Device";
    const watt = parseFloat(document.getElementById(`watt-${id}`).value);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);

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
  result += isSafe
    ? `<span style="color: limegreen; font-weight: bold;">Safe to run</span>`
    : `<span style="color: red; font-weight: bold;">Overload or voltage drop risk</span>`;

  if (!isSafe) {
    result += `<div style="margin-top:1em;"><strong>Suggested Actions:</strong><ul>`;
    if (currentDraw > plugType) result += `<li>Use a higher-rated plug (e.g., 32A)</li>`;
    if (currentDraw > cableLimit) result += `<li>Use a thicker cable (e.g., 4mm²)</li>`;
    if (!voltageDropSafe) result += `<li>Shorten the cable or increase its size to reduce voltage drop</li>`;
    result += `</ul></div>`;
  }

  document.getElementById("result").innerHTML = result;
}