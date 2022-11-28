const url_tds = "https://api.thingspeak.com/channels/1913326/fields/1/last.txt";
const url_turb = "https://api.thingspeak.com/channels/1913326/fields/4/last.txt";
const url_ph = "https://api.thingspeak.com/channels/1913326/fields/5/last.txt";
const url_temp = "https://api.thingspeak.com/channels/1913326/fields/2/last.txt";

var max_tds = 600;
var min_tds = 50;

var max_ph = 8;
var min_ph = 5;

var max_turb = 3000;
var min_turb = 0;

var tds = 0;
var ph = 0;
var turb = 0;

function Repeat() { // Repeat is called from body onload
	setTimeout(send_alert, 59500); // Runs function after 59.5 seconds
	setInterval(send_alert, 60000); // Runs function every 60 seconds
	setInterval(color_change, 5000); // Runs function every 5 seconds
	setTimeout(update_data, 4750);
	setInterval(update_data, 5000);
}

function threshold_cross() { // Checks if thresholds have been exceeded
	// $ uses ajax get to get data from url
	$.get(url_tds, function (data) {tds = data;});
	$.get(url_turb, function (data) {turb = data;});
	$.get(url_ph, function (data) {ph = data;});

	var tds_alert = "";
	if ((tds>max_tds) || (tds<min_tds)) {
		if (tds>max_tds) {
			tds_alert = tds_alert.concat("High TDS levels!");
		}
		else {
			tds_alert = tds_alert.concat("Low TDS levels!");
		}
		tds_alert = tds_alert.concat(" TDS = ");
		tds_alert = tds_alert.concat(tds);
		tds_alert = tds_alert.concat("\n");
	}

	var turb_alert = "";
	if ((turb>max_turb) || (turb<min_turb)) {
		if (turb>max_turb) {
			turb_alert = turb_alert.concat("High Turbidity levels!");
		}
		else {
			turb_alert = turb_alert.concat("Low Turbidity levels!");
		}
		turb_alert = turb_alert.concat(" Turbidity = ");
		turb_alert = turb_alert.concat(turb);
		turb_alert = turb_alert.concat("\n");
	}

	var ph_alert = "";
	if ((ph>max_ph) || (ph<min_ph)) {
		if (ph>max_ph) {
			ph_alert = ph_alert.concat("High pH levels!");
		}
		else {
			ph_alert = ph_alert.concat("Low pH levels!");
		}
		ph_alert = ph_alert.concat(" pH = ");
		ph_alert = ph_alert.concat(ph);
		ph_alert = ph_alert.concat("\n");
	}

	turb_alert = turb_alert.concat(ph_alert);
	tds_alert = tds_alert.concat(turb_alert);

	return(tds_alert);
}

function send_alert() {

	var alert_text = threshold_cross();
	console.log(alert_text);

	if(alert_text!= "") {
		swal("Warning!" , alert_text);
	}
}

function setWhite() {

	const body = document.getElementById("body");
	body.style.backgroundColor = "white";

}

function color_change() {

	var alert_text = threshold_cross;

	if (alert_text != "") {
		const body = document.getElementById("body");
		body.style.backgroundColor = "red";
		const white = document.getElementById("white");
		white.style.backgroundColor = "white";
		const white2 = document.getElementById("white2");
		white2.style.backgroundColor = "white";
		setTimeout(setWhite, 3000);
	}

}

function update_data() {

	$.get(url_tds, function (data) {tds = data;});
	$.get(url_turb, function (data) {turb = data;});
	$.get(url_ph, function (data) {ph = data;});
	$.get(url_temp, function (data) {temp = data;});

	var temp_value = document.getElementById("temp");
	temp_value.textContent = temp;
	var tds_value = document.getElementById("tds");
	tds_value.textContent = tds;
	var ph_value = document.getElementById("ph");
	ph_value.textContent = ph;
	var turb_value = document.getElementById("turb");
	turb_value.textContent = turb;
}