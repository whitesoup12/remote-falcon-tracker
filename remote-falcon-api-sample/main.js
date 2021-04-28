$(document).ready(function() {
  /**
   * Variables
   */

  //Global JWT variable to be used in all requests
  var _jwt = "";
  //Global URL variable for the Remote Falcon API (be sure to replace myshowsubdomain with your own)
  var _remoteFalconBaseUrl = "https://remotefalcon.com/remotefalcon/api/external/subdomain/myshowsubdomain";

  /**
   * JWT Stuff
   */

  //Gets the JWT from the generateJwt.php file
  $.ajax({ url: 'generateJwt.php',
    data: {},
    type: 'post',
    success: function(jwt) {
      set_jwt(jwt);
    }
  });

  //Function to set the global JWT variable from the ajax call
  function set_jwt(jwt) {
    _jwt = jwt;
  }

  /**
   * Primary Page Functions
   */
  $('#getSequences').click(function() {
		getSequences();
	});

  //Get Sequences and put them in a table
  function getSequences() {
    $.ajax({
      url: _remoteFalconBaseUrl + "/sequences",
      type: 'GET',
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + _jwt);
      },
      data: {},
      success: function(sequences) {
        console.log(sequences);
        if(sequences.length > 0) {
          var sequenceTable =
            "<table>" +
              "<tr>" +
                "<th>Sequence Name</th>" +
                "<th>Sequence Display Name</th>" +
              "</tr>" +
              "<tr>";
          sequences.forEach(sequence => {
            sequenceTable += 
              "<td>" + sequence.sequenceName + "</td>" +
              "<td>" + sequence.sequenceDisplayName + "</td>" + 
              "</tr>";
          });
          sequenceTable += "</table>";
          $('#sequences').html(sequenceTable);
        }
      },
      error: function(error) {
        console.log(error);
      },
    });
  }
});