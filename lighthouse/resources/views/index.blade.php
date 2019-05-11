<!doctype html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400&subset=latin-ext,cyrillic,cyrillic-ext,greek,greek-ext" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">

    <title>Lighthouse</title>
    <style>
        html {
          font-family: 'Roboto';
          background-color: #eeeeee;
        }
        body {
          margin: 0;
        }
        * {
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
        }
        #root {
          display: flex;
          flex-direction: row;
        }
        #root > div {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script src="{{mix('js/index.js')}}" ></script>
  </body>
</html>
