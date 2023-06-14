//This is the example of jquery.
$("h1").css("font-size", "5rem");
$("button").click(function () {
    $("h1").css("color", "green");
});

$("input").keydown(function (event) {
    $("h1").text(event.key);
});