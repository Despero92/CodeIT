"use strict";
$( document ).on('ready', function () {
    $.getJSON( "http://codeit.pro/frontTestTask/company/getList", function ( data ) {
        var jsonObj = data,
            totalComp = "<div class='totalCompanies'><span>" + jsonObj.list.length + "</span></div>",
            swiper = new Swiper( '.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true
            } ),
            arrayPartners = searchPartners( jsonObj.list );
        //      Companies number start
        $( '#totalCompanies' ).append( totalComp );
        //      Companies number end

        //      Companies list start
        for ( var i = 0; i < jsonObj.list.length; i++ ) {
            for ( var key in jsonObj.list[ i ] ) {
                if ( key === 'name' ) {
                    $( '#listCompanies ul' ).append( "<li>" + jsonObj.list[ i ][ key ] + "</li>" );
                }
            }
        }
        $( '#listCompanies ul li' ).on( 'click', function () {
            if ( $( this ).hasClass( 'active' ) ) {
                $( '#listCompanies ul li' ).removeClass( 'active' );
                $( this ).removeClass( 'active' );
                $( ".blockWrap" ).slideUp();
            } else {
                $( '#listCompanies ul li' ).removeClass( 'active' );
                $( this ).addClass( 'active' );
                $( ".blockWrap" ).slideDown();
            }
        } );
        //      Companies list end

        //      Company partners start
        arrayPartners.sort( function ( a, b ) {
            if ( a.value < b.value ) return 1;
            if ( a.value > b.value ) return -1;
        } );
        for ( var i = 0; i < arrayPartners.length; i++ ) {
            $( "#partnersList" ).append( "<li><div class='partnerContainer'><div class='percentBox'><h2>" + arrayPartners[ i ].value + "%" + "</h2></div><div class='partnerBox'><h2>" + arrayPartners[ i ].name + "</h2></div></div></li>" );
        }
        $( "#sort .fa-caret-up" ).on( 'click', function () {
            arrayPartners.sort( function ( a, b ) {
                if ( a.name > b.name ) return 1;
                if ( a.name < b.name ) return -1;
            } );
            $( "#partnersList" ).empty();
            for ( var i = 0; i < arrayPartners.length; i++ ) {
                $( "#partnersList" ).append( "<li><div class='partnerContainer'><div class='percentBox'><h2>" + arrayPartners[ i ].value + "%" + "</h2></div><div class='partnerBox'><h2>" + arrayPartners[ i ].name + "</h2></div></div></li>" );
            }
        } );
        $( "#sort .fa-caret-down" ).on( 'click', function () {
            arrayPartners.sort( function ( a, b ) {
                if ( a.name < b.name ) return 1;
                if ( a.name > b.name ) return -1;
            } );
            $( "#partnersList" ).empty();
            for ( var i = 0; i < arrayPartners.length; i++ ) {
                $( "#partnersList" ).append( "<li><div class='partnerContainer'><div class='percentBox'><h2>" + arrayPartners[ i ].value + "%" + "</h2></div><div class='partnerBox'><h2>" + arrayPartners[ i ].name + "</h2></div></div></li>" );
            }
        } );
        $( "#percent .fa-caret-up" ).on( 'click', function () {
            arrayPartners.sort( function ( a, b ) {
                if ( a.value > b.value ) return 1;
                if ( a.value < b.value ) return -1;
            } );
            $( "#partnersList" ).empty();
            for ( var i = 0; i < arrayPartners.length; i++ ) {
                $( "#partnersList" ).append( "<li><div class='partnerContainer'><div class='percentBox'><h2>" + arrayPartners[ i ].value + "%" + "</h2></div><div class='partnerBox'><h2>" + arrayPartners[ i ].name + "</h2></div></div></li>" );
            }
        } );
        $( "#percent .fa-caret-down" ).on( 'click', function () {
            arrayPartners.sort( function ( a, b ) {
                if ( a.value < b.value ) return 1;
                if ( a.value > b.value ) return -1;
            } );
            $( "#partnersList" ).empty();
            for ( var i = 0; i < arrayPartners.length; i++ ) {
                $( "#partnersList" ).append( "<li><div class='partnerContainer'><div class='percentBox'><h2>" + arrayPartners[ i ].value + "%" + "</h2></div><div class='partnerBox'><h2>" + arrayPartners[ i ].name + "</h2></div></div></li>" );
            }
        } );
        //      Company partners end

        //      Companies by location start
        Highcharts.chart( 'container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                context: true
            },
            credits: {
                enabled: false
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                }
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [ {
                name: 'Brands',
                colorByPoint: true,
                data: countryInfo()
            } ],
            responsive: {
                rules: [ {
                    condition: {
                        minWidth: 319
                    }
                } ]
            }
        } );
        $( "#container" ).on( 'click', function ( event ) {
            event.preventDefault();
            var string = event.target.attributes[ 6 ].value,
                array = sortLocationCompany( jsonObj.list );
            $( "#listLocations" ).empty();
            for ( var i = 0; i < array.length; i++ ) {
                if ( string.indexOf( i ) !== -1 ) {
                    for ( var y = 0; y < array[ i ].length; y++ ) {
                        $( "#listLocations" ).append( "<li>" + array[ i ][ y ] + "</li>" );
                    }
                }
            }
            $( '#overlay' ).fadeIn( 400,
                function () {
                    $( '#modalForm' )
                        .css( 'display', 'block' )
                        .animate( { opacity: 1, top: '50%' }, 200 );
                } );
        } );
        $( '#modalClose, #overlay' ).on( "click", function () {
            $( '#modalForm' )
                .animate( { opacity: 0, top: '45%' }, 200,
                    function () {
                        $( this ).css( 'display', 'none' );
                        $( '#overlay' ).fadeOut( 400 );
                    }
                );
        } );
        //      Companies by location end

        function searchPartners( array ) {
            var resultArray = [];
            for ( var i = 0; i < array.length; i++ ) {
                for ( var key in array[ i ] ) {
                    if ( key === 'partners' ) {
                        for ( var y = 0; y < array[ i ][ key ].length; y++ ) {
                            resultArray.push( {
                                name: array[ i ][ key ][ y ].name,
                                value: array[ i ][ key ][ y ].value
                            } );
                        }
                    }
                }
            }
            return resultArray;
        }

        function searchLocations( array ) {
            var resultArray = [];
            for ( var i = 0; i < array.length; i++ ) {
                for ( var key in array[ i ] ) {
                    if ( key === 'location' ) {
                        resultArray.push( { name: array[ i ][ key ].name, value: array[ i ][ key ].code } );
                    }
                }
            }
            return resultArray;
        }

        function sortLocationCompany( array ) {
            var arrayCountryList = [ [], [], [], [], [], [] ];
            for ( var i = 0; i < array.length; i++ ) {
                if ( array[ i ][ 'location' ].name === 'Poland' ) {
                    arrayCountryList[ 0 ].push( array[ i ].name );
                }
                if ( array[ i ][ 'location' ].name === 'Ukraine' ) {
                    arrayCountryList[ 1 ].push( array[ i ].name );
                }
                if ( array[ i ][ 'location' ].name === 'United States' ) {
                    arrayCountryList[ 2 ].push( array[ i ].name );
                }
                if ( array[ i ][ 'location' ].name === 'Norway' ) {
                    arrayCountryList[ 3 ].push( array[ i ].name );
                }
                if ( array[ i ][ 'location' ].name === 'Sweden' ) {
                    arrayCountryList[ 4 ].push( array[ i ].name );
                }
                if ( array[ i ][ 'location' ].name === 'Germany' ) {
                    arrayCountryList[ 5 ].push( array[ i ].name );
                }
            }
            return arrayCountryList;
        }

        function countryInfo() {
            var arrayLocation = searchLocations( jsonObj.list ),
                resultArray = [],
                arrayCountryCode = [],
                objCountCountry = {
                    poland: 0,
                    ukraine: 0,
                    united_states: 0,
                    norway: 0,
                    sweden: 0,
                    germany: 0
                };
            for ( var i = 0; i < arrayLocation.length; i++ ) {
                if ( arrayLocation[ i ].name === 'Poland' ) {
                    objCountCountry.poland += 1;
                }
                if ( arrayLocation[ i ].name === 'Ukraine' ) {
                    objCountCountry.ukraine += 1;
                }
                if ( arrayLocation[ i ].name === 'Germany' ) {
                    objCountCountry.germany += 1;
                }
                if ( arrayLocation[ i ].name === 'United States' ) {
                    objCountCountry.united_states += 1;
                }
                if ( arrayLocation[ i ].name === 'Norway' ) {
                    objCountCountry.norway += 1;
                }
                if ( arrayLocation[ i ].name === 'Sweden' ) {
                    objCountCountry.sweden += 1;
                }
                if ( arrayCountryCode.indexOf( arrayLocation[ i ].value ) === -1 ) {
                    arrayCountryCode.push( arrayLocation[ i ].value );
                }
                continue;
            }
            for ( var i = 0; i < arrayCountryCode.length; i++ ) {
                if ( arrayCountryCode[ i ] === 'PL' ) {
                    resultArray.push( { name: arrayCountryCode[ i ], y: objCountCountry.poland } )
                }
                if ( arrayCountryCode[ i ] === 'UA' ) {
                    resultArray.push( { name: arrayCountryCode[ i ], y: objCountCountry.ukraine } )
                }
                if ( arrayCountryCode[ i ] === 'US' ) {
                    resultArray.push( { name: arrayCountryCode[ i ], y: objCountCountry.united_states } )
                }
                if ( arrayCountryCode[ i ] === 'NO' ) {
                    resultArray.push( { name: arrayCountryCode[ i ], y: objCountCountry.norway } )
                }
                if ( arrayCountryCode[ i ] === 'SE' ) {
                    resultArray.push( { name: arrayCountryCode[ i ], y: objCountCountry.sweden } )
                }
                if ( arrayCountryCode[ i ] === 'DE' ) {
                    resultArray.push( { name: arrayCountryCode[ i ], y: objCountCountry.germany } )
                }
            }
            return resultArray;
        }

    } ).done( function () {
        $( ".loader" ).delay( 100 ).fadeOut( "slow" );
    } );

    $.getJSON( "http://codeit.pro/frontTestTask/news/getList", function ( data ) {
        var jsonObj = data,
            string = '';
        //          News box start
        setNews( jsonObj.list );
        function setNews( array ) {
            var sliders = document.getElementsByClassName( 'swiper-slide' );
            for ( var i = 0; i < sliders.length; i++ ) {
                sliders[ i ].children[ 0 ].setAttribute( "src", array[ i ][ 'img' ] );
                sliders[ i ].children[ 1 ].children[ 0 ].setAttribute( "href", "http://" + array[ i ][ 'link' ] );
                if ( array[ i ][ 'description' ].length > 200 ) {
                    string = array[ i ][ 'description' ].substring( 0, 199 ) + " ...";
                    sliders[ i ].children[ 1 ].children[ 1 ].innerHTML = string;
                } else {
                    sliders[ i ].children[ 1 ].children[ 1 ].innerHTML = array[ i ][ 'description' ];
                }
                sliders[ i ].children[ 2 ].children[ 0 ].children[ 0 ].innerHTML = array[ i ][ 'author' ];
                sliders[ i ].children[ 2 ].children[ 1 ].children[ 0 ].setAttribute( "datetime", timeConverter( array[ i ][ 'date' ] ) );
                sliders[ i ].children[ 2 ].children[ 1 ].children[ 0 ].innerHTML = timeConverter( array[ i ][ 'date' ] );
                continue;
            }
        }

        function timeConverter( UNIX_timestamp ) {
            var a = new Date( UNIX_timestamp * 1000 ),
                months = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
                year = a.getFullYear(), month = months[ a.getMonth() ],
                date = (a.getDate() < 10) ? "0" + a.getDate() : a.getDate(),
                time = year + '-' + month + '-' + date;
            return time;
        }

        //          News box end
    } ).done( function () {
        $( ".loader" ).delay( 100 ).fadeOut( "slow" );
    } );
} );

window.load = formCheck;

// Check Form start
function formCheck() {
    var obj_form = document.forms.form,
        name = obj_form.elements.name,
        secondName = obj_form.elements.secondname,
        email = obj_form.elements.email,
        pass = obj_form.elements.pass;

    // If there is a field name, then call the function onNameChange on the event change
    if ( name ) {
        name.onchange = onNameChange;
    }
    if ( secondName ) {
        secondName.onchange = onSecondNameChange;
    }
    if ( email ) {
        email.onchange = onEmailChange;
    }
    if ( pass ) {
        pass.onchange = onPasswordChange;
    }

    // The function displays an error message if the field did not pass the validation
    function grantDeny( element, regexp, errorMessage ) {
        var value = element.value,
            name = element.name,
            spanErrors = element.parentNode.getElementsByClassName( 'error' ),
            msgElem = document.createElement( 'span' );
        msgElem.className = "error";
        msgElem.innerHTML = errorMessage;
        if ( name === "name" && (value.length > 2 && value.length < 21 ) ) {
            if ( regexp.test( value ) ) {
                element.classList.remove( "denied" );
                element.classList.add( "granted" );
                if ( spanErrors[ 0 ] ) {
                    spanErrors[ 0 ].remove();
                }
            } else {
                element.classList.remove( "granted" );
                element.classList.add( "denied" );
                if ( (element.previousSibling.nodeType === 3) || (element.previousSibling.className !== "error") ) {
                    element.parentNode.appendChild( msgElem, element );
                }
            }
        } else if ( name === 'secondname' && (value.length > 3 && value.length < 61) ) {
            if ( regexp.test( value ) ) {
                element.classList.remove( "denied" );
                element.classList.add( "granted" );
                if ( spanErrors[ 0 ] ) {
                    spanErrors[ 0 ].remove();
                }
            } else {
                element.classList.remove( "granted" );
                element.classList.add( "denied" );
                console.log( element.className );
                if ( (element.previousSibling.nodeType === 3) || (element.previousSibling.className !== "error") ) {
                    element.parentNode.appendChild( msgElem, element );
                }
            }
        } else if ( name === 'email' && (value.length > 3 && value.length < 25) ) {
            if ( regexp.test( value ) ) {
                element.classList.remove( "denied" );
                element.classList.add( "granted" );
                if ( spanErrors[ 0 ] ) {
                    spanErrors[ 0 ].remove();
                }
            } else {
                element.classList.remove( "granted" );
                element.classList.add( "denied" );
                console.log( element.className );
                if ( (element.previousSibling.nodeType === 3) || (element.previousSibling.className !== "error") ) {
                    element.parentNode.appendChild( msgElem, element );
                }
            }
        } else if ( name === 'pass' && (value.length > 3 && value.length < 18) ) {
            if ( regexp.test( value ) ) {
                element.classList.remove( "denied" );
                element.classList.add( "granted" );
                if ( spanErrors[ 0 ] ) {
                    spanErrors[ 0 ].remove();
                }
            } else {
                element.classList.remove( "granted" );
                element.classList.add( "denied" );
                console.log( element.className );
                if ( (element.previousSibling.nodeType === 3) || (element.previousSibling.className !== "error") ) {
                    element.parentNode.appendChild( msgElem, element );
                }
            }
        } else {
            element.classList.remove( "granted" );
            element.classList.add( "denied" );
            if ( (element.previousSibling.nodeType === 3) || (element.previousSibling.className !== "error") ) {
                var msgElem = document.createElement( 'span' );
                msgElem.className = "error";
                msgElem.innerHTML = errorMessage;
                if ( !spanErrors[ 0 ] ) {
                    element.parentNode.appendChild( msgElem, element );
                }
            }
        }
    }

    // Checking each field for validation
    function onNameChange() {
        var element = this,
            errorMessage = " Incorrect name ",
            regexp = /^[A-ZА-ЯЁ]{0,1}[a-zA-Zа-яёА-ЯЁ\s\-]+$/;
        grantDeny( element, regexp, errorMessage );
    }

    function onSecondNameChange() {
        var element = this,
            errorMessage = " Incorrect last name ",
            regexp = /^[A-ZА-ЯЁ]{0,1}[a-zA-Zа-яёА-ЯЁ\s\-]+$/u;
        grantDeny( element, regexp, errorMessage );
    }

    function onEmailChange() {
        var element = this,
            regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/u,
            errorMessage = " Incorrect email ";
        grantDeny( element, regexp, errorMessage );
    }

    function onPasswordChange() {
        var element = this,
            regexp = /^[a-z0-9-_]{6,}$/,
            errorMessage = " Incorrect password ";
        grantDeny( element, regexp, errorMessage );
    }
}
formCheck();
// Check Form end

// Server request start
function call() {

    // Receiving the filled data from the form as a string
    var msg = $( '#form' ).serialize();

    // A request is made to the server
    $.ajax( {
        type: 'POST',
        url: 'http://codeit.pro/frontTestTask/user/registration',
        data: msg,
        success: function ( data ) {
            var obj_form = document.forms.form,
                name = obj_form.elements.name,
                secondName = obj_form.elements.secondname,
                email = obj_form.elements.email,
                pass = obj_form.elements.pass;
            function showErrorMess( elem, errorMessage ) {
                var msgElem = document.createElement( 'span' ),
                spanErrors = elem.parentNode.getElementsByClassName( 'error' );
                msgElem.className = "error";
                msgElem.innerHTML = errorMessage;
                if ( !spanErrors[ 0 ] ) {
                    elem.parentNode.appendChild( msgElem, elem );
                }
            }
            if(data.status === "OK"){
                alert('Registration is complete');
            }
            if ( data.status === 'Form Error' ) {
                if(data.field === 'email'){
                    showErrorMess(email , 'Incorrect email');
                } else if( data.field === 'secondname'){
                    if(data.message === "Field 'secondname' should contain from 3 to 60 letters"){
                        showErrorMess( secondName, 'Last name must be more than 3 characters');
                    }else{
                        showErrorMess( secondName, 'Incorrect last name');
                    }
                }else if( data.field === 'name'){
                    if(data.message === "Field 'name' should contain from 3 to 60 letters"){
                        showErrorMess( name, 'Name must be more than 3 characters');
                    }else{
                        showErrorMess( name, 'Incorrect name');
                    }
                } else {
                    showErrorMess(pass, 'Incorrect password');
                }
            } else {
                if ( data.message === 'Creating user error. Email already exists.' ) {
                    showErrorMess( email, 'Email already exists');
                }else{
                    alert( "Error! Incorrect Route" );
                }
            }
        },
        error: function ( data ) {
            if(data.status === 'Error' && data.message !== 'Creating user error. Email already exists.'){
                alert( "Error! Incorrect Route" );
            }
        }
    } );
}
// Server requst end



