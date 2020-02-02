// Initialize your app
var myApp = new Framework7({
   material: true
});

// Export selectors engine
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
    // untuk dinamis navbar
    dynamicNavbar: true
});

mainView.router.refreshPage();

// memanggil halaman lain
myApp.onPageInit('index', function (page) {
  

  //sembunyikan tombol 
 $$('#nyala').hide();
 $$('#mati').hide();
 $$('#putuskan_bt').hide();

 //untuk select
  $$('.smart-select').on('click', function() {
    var arr=[];
    var a='<option>Pilihan</option>';
    bluetoothSerial.list(function(devices) {
       devices.forEach(function(device) {
        arr.push(device.name+"-"+device.id);
        a+='<option value="'+device.id+'">'+device.name+'</option>';
        });
    });
    //loader
    myApp.showPreloader('Mohon Tunggu');
    setTimeout(function () {
        myApp.hidePreloader();
        $$('#devices').html(a);
    }, 2000);
    // myApp.alert(arr.toString());    
  });
  
  $$('#koneksi_bt').on('click', function() {
    var deviceToConnect=$$('#devices').val();
    // console.log(deviceToConnect);
    bluetoothSerial.connect(deviceToConnect, function() {      
      myApp.alert('berhasil terkoneksi');
      $$('#nyala').show();
      $$('#mati').show();
      $$('#putuskan_bt').show();
    }, function() {
      myApp.alert('gagal terkoneksi');
    });
  });

  $$('#nyala').on('click', function() {
    bluetoothSerial.write("1", function() {
      myApp.alert('Lampu Menyala');
    }, function(){
      myApp.alert('Lampu gagal Menyala');
    });
  });

  $$('#mati').on('click', function() {
    bluetoothSerial.write("2", function() {
      myApp.alert('Lampu Mati');
    }, function(){
      myApp.alert('Lampu gagal mati');
    });
  });


  $$('#putuskan_bt').on('click', function() {
    bluetoothSerial.disconnect(function() {
      myApp.alert('Berhasil terputus');
    },function(){
      myApp.alert('Gagal terputus');
    });
    $$('#nyala').hide();
    $$('#mati').hide();
    $$('#putuskan_bt').hide();
  });
});