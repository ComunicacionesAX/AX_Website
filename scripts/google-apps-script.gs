// === Destinatarios (siempre estos dos) ===
var NOTIFY_EMAILS = [
  "manuela.mesa.beltran@premexcorp.com",
  "sebastian.villegas@premexcorp.com",
];

var SHEET_NAME = "Cotizaciones";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    guardarFila_(data);
    enviarCorreo_(data);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function guardarFila_(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  var headers = [
    "Fecha",
    "Nombre",
    "Empresa/Granja",
    "Pais/Ciudad",
    "Correo",
    "WhatsApp/Telefono",
    "Tipo de produccion",
    "Cantidad de animales",
    "Solucion buscada",
    "Nivel de digitalizacion",
    "Mensaje",
  ];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.company || "",
    data.location || "",
    data.email || "",
    data.phone || "",
    data.prodType || "",
    data.animalCount || "",
    data.solution || "",
    data.digLevel || "",
    data.message || "",
  ]);
}

function enviarCorreo_(data) {
  var subject = "Nueva cotizacion - " + (data.name || "sin nombre");

  var lines = [
    ["Nombre", data.name],
    ["Empresa / Granja", data.company],
    ["Pais / Ciudad", data.location],
    ["Correo", data.email],
    ["WhatsApp / Telefono", data.phone],
    ["Tipo de produccion", data.prodType],
    ["Cantidad de animales", data.animalCount],
    ["Solucion buscada", data.solution],
    ["Nivel de digitalizacion", data.digLevel],
    ["Mensaje", data.message],
  ];

  var body = "";
  for (var i = 0; i < lines.length; i++) {
    body += lines[i][0] + ": " + (lines[i][1] || "-") + "\n";
  }

  MailApp.sendEmail(NOTIFY_EMAILS.join(","), subject, body);
}

// Ejecuta esta funcion UNA vez desde el editor para autorizar los permisos.
function autorizar() {
  guardarFila_({ name: "Autorizacion", email: "test@test.com" });
  enviarCorreo_({ name: "Autorizacion", email: "test@test.com" });
}

function json_(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
