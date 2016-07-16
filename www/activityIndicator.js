var ActivityIndicator;

if(cordova.platformId == "browser") {
    var currentIndicator = undefined;
    var indicatorPadding = 20;

    function centerAndShowIndicator() {
        setTimeout(function() {
            var frame = document.getElementsByClassName("CurrentPage")[0];
            currentIndicator.style.left = Math.floor((frame.clientWidth - currentIndicator.clientWidth) / 2) + "px";
            currentIndicator.style.top = Math.floor((frame.clientHeight - currentIndicator.clientHeight) / 2) + "px";
            currentIndicator.style.visibility = "visible";
        }, 0);
    }

    ActivityIndicator = {
        show: function (text) {
        	text = text || "Please wait...";

            if(currentIndicator) {
                currentIndicator.getElementsByClassName("IndicatorText")[0].innerHTML = text;
                centerAndShowIndicator();
            }
            else {
                currentIndicator = document.createElement("div");
                currentIndicator.style.backgroundColor = "rgba(0,0,0, 0.8)";
                currentIndicator.style.borderRadius = "20px";
                currentIndicator.style.padding = indicatorPadding + "px";
                currentIndicator.style.display = "inline-block";
                currentIndicator.style.textAlign = "center";
                currentIndicator.style.position = "absolute";

                var image = document.createElement("img");
                image.style.display = "inline-block";
                image.style.textAlign = "center";
                image.style.width = "40px";
                image.style.height = "40px";
                image.style.marginBottom = indicatorPadding + "px";
                image.src = "activity-indicator-spinner.gif";
                currentIndicator.appendChild(image);

                var textElement = document.createElement("div");
                textElement.className = "IndicatorText";
                textElement.style.color = "white";
                textElement.style.fontSize = "14px";
                textElement.style.fontFamily = "HelveticaNeue, Arial, Sans-Serif";
                textElement.textAlign = "center";
                textElement.innerHTML = text;
                currentIndicator.appendChild(textElement);

                currentIndicator.style.visibility = "hidden";
                document.body.appendChild(currentIndicator);
                centerAndShowIndicator();
            }
        },

        hide: function () {
            if(currentIndicator) {
                currentIndicator.parentElement.removeChild(currentIndicator);
                currentIndicator = undefined;
            }
        }
    };
}
else {
    ActivityIndicator = {
        show: function (text) {
        	text = text || "Please wait...";
            cordova.exec(null, null, "ActivityIndicator", "show", [text]);
        },
        hide: function () {
            cordova.exec(null, null, "ActivityIndicator", "hide", []);
        }
    };
}

module.exports = ActivityIndicator;
