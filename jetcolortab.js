var manifest = {
  settings: [
    {
      name: "colorSchemes",
      type: "group",
      label: "Color Schemes",
      settings: [
        { name: "color0", type: "text", label: "Color 1", default: "color: rgb(0, 0, 0); background-color: rgb(246, 250, 125); border: 1px solid #000 !important;" },
        { name: "color1", type: "text", label: "Color 2", default: "color: #000; background-color:#FFCC99; border: 1px solid #000 !important" },
        { name: "color2", type: "text", label: "Color 3", default: "color: #000000; background-color: rgb(197, 212, 242); border: 1px solid #000 !important;" },
        { name: "color3", type: "text", label: "Color 4", default: "color: #000000; background-color: rgb(255, 220, 120); border: 1px solid #000 !important;" },
        { name: "color4", type: "text", label: "Color 5", default: "color: rgb(0, 0, 0); background-color: rgb(181, 233, 157); border: 1px solid #000 !important" },
        { name: "color5", type: "text", label: "Color 6", default: "" },
        { name: "color6", type: "text", label: "Color 7", default: "" },
        { name: "color7", type: "text", label: "Color 8", default: "" },
      ]
    }
  ]
};

jetpack.future.import("menu");
jetpack.future.import("storage.settings");

var collapseImg = "data:binary;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFESURBVHjapFM7a4RAEF6DL7QRLAT9M16dFMEmXJPSv5PeKoRASCMJpPf+ioWChWCl4DPOxB334iUkODDu7MznvHZGmqaJ7SEZPlEUwZHIsuyrqso4z3cE9X3P2rYlnu+nWX0Iw/DLwTiOied5vuu6f4qa57mfZVkCTuQlgu84DhuGgUBlWWI0IMjGtm2yATZNU59KgB8hTZGapmFBEKAcx/HGzoOhg67rkEWCH4Zxlb/b+V0WAVVVnQG7cY02142yoijMsizKiDKAeuu6Zrd39+SgXVpyHRxJ9/b6xAzDOM+Al4DPNfz+AjzbjQPe8fg5IvDNMcTz42XVwWwA9mIPdF0nIPZDaCLULTZw04Ndr3BpDiRJYu+PD5T2T3NwtUQ4zaOJSs6apjHTNJFBFm2AXfaBduEAs10Uxb+WCTPdu86fAgwA4uoU1viDGFwAAAAASUVORK5CYII=";
var expandImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMCAwiHq0GoI4AAAFNSURBVDjLpZM9TgQxDIU/J54NU1DSchBusA13QALxd4m5BCAEEhISF6ChokBCHISWarea2XESit0Z/gYYhCsnsZ3n92zJOfMfE0CrqrpV9dOxtUTALN5VVbWtQOm9nx4cHv/p57PTkylQKrCWUgLg4vIKVb8CNmQZs8je7g6rnDXtouu6JoQJqorIcIGcM94bdV333WjnNU1LURR43yHIA3RlRISmaftbXZIiNG2DOEeMkZTzYL4TQZxbxq5Q9gjaZoGIcHy0/yN5p+eXtM2iP7vOMTMKLX5lv9ACM/vUAtCaEULg6vqGnNIgA+IcIQRas14n7V5jTIQwGTUDMaZe6Z6DFCOTybgCKcaPLYBgKeJVvx2ht1ECS7EfNoWlPE48ZVl+lY8hOT3unYx5Np8/PT7cb6WR2+REmM3nT0AWYB3YBDYAP3KXIvACPL8CauZ9gVDgEEEAAAAASUVORK5CYII=";

jetpack.statusBar.append({
  html: '<img style="position: absolute; left: 100px" id="tabColorStatus" src="' + collapseImg + '"></img><div id="tabColorContainer" style="cursor:pointer"></div>',
  width: 8 * 16,
  onReady: function(doc) {
    console.log("--->" + doc.documentElement);//.getElementById("urlbar-icons"));
    $("#tabColorStatus", doc).click(function() {
      if (this.src === expandImg) {
        this.src = collapseImg;
        this.style.left = "100px";
        doc.documentElement.style.width = (8 * 16) + "px";
        $("#tabColorContainer", doc).show();
      } else {
        this.src = expandImg;
        this.style.left = "0";
        $("#tabColorContainer", doc).hide();
        doc.documentElement.style.width = "16px";
      }
    });

    var tabColorContainer = $("#tabColorContainer", doc);
    
    for (var i = 0; i < 8; i++) {
      let color = jetpack.storage.settings.colorSchemes['color' + i];
      if (color != "") {
        var box = $('<div style="position:absolute; width:16px; height:16px; left:' + (i * 16) + 'px; ' + color + '"></div>', doc);
        box.click(function() {
          jetpack.tabs.focused.raw.style.cssText = "-moz-appearance:none !important; " + color;
        });
        tabColorContainer.append(box);
      }
    }
  }
});
