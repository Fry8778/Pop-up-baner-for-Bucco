<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/snow.js"></script>
<script>
  $(document).ready(function() {
    $.snowfall('body', {
      flakeCount: 200,
      minSize:5, 
      maxSize: 20,
      round: 4
    });
  });
</script>







{/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script acync src="/snow10.js"></script>
<script>
setTimeout(function (argument) {
    $(document).snowfall({flakeCount : 200, minSize:5, maxSize:20, round: 4});
  }, 5000);
</script> */}