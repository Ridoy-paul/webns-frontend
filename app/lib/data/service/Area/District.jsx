const dbDistrict = [
    {
      "id": 1,
      "name": "Dhaka",
      "bn_name": "ঢাকা"
    },
    {
      "id": 2,
      "name": "Faridpur",
      "bn_name": "ফরিদপুর"
    },
    {
      "id": 3,
      "name": "Gazipur",
      "bn_name": "গাজীপুর"
    },
    {
      "id": 4,
      "name": "Gopalganj",
      "bn_name": "গোপালগঞ্জ"
    },
    {
      "id": 5,
      "name": "Kishoreganj",
      "bn_name": "কিশোরগঞ্জ"
    },
    {
      "id": 6,
      "name": "Madaripur",
      "bn_name": "মাদারিপুর"
    },
    {
      "id": 7,
      "name": "Manikganj",
      "bn_name": "মানিকগঞ্জ"
    },
    {
      "id": 8,
      "name": "Munshiganj",
      "bn_name": "মুন্সিগঞ্জ"
    },
    {
      "id": 9,
      "name": "Narayanganj",
      "bn_name": "নারায়ণগঞ্জ"
    },
    {
      "id": 10,
      "name": "Narsingdi",
      "bn_name": "নরসিংদী"
    },
    {
      "id": 11,
      "name": "Rajbari",
      "bn_name": "রাজবাড়ী"
    },
    {
      "id": 12,
      "name": "Shariatpur",
      "bn_name": "শরীয়তপুর"
    },
    {
      "id": 13,
      "name": "Tangail",
      "bn_name": "টাঙ্গাইল"
    },
    {
      "id": 14,
      "name": "Bandarban",
      "bn_name": "বান্দরবান"
    },
    {
      "id": 15,
      "name": "Brahmanbaria",
      "bn_name": "ব্রাহ্মণবাড়িয়া"
    },
    {
      "id": 16,
      "name": "Chandpur",
      "bn_name": "চাঁদপুর"
    },
    {
      "id": 17,
      "name": "Chittagong",
      "bn_name": "চট্টগ্রাম"
    },
    {
      "id": 18,
      "name": "Comilla",
      "bn_name": "কুমিল্লা"
    },
    {
      "id": 19,
      "name": "Cox's Bazar",
      "bn_name": "কক্সবাজার"
    },
    {
      "id": 20,
      "name": "Feni",
      "bn_name": "ফেনী"
    },
    {
      "id": 21,
      "name": "Khagrachari",
      "bn_name": "খাগড়াছড়ি"
    },
    {
      "id": 22,
      "name": "Lakshmipur",
      "bn_name": "লক্ষ্মীপুর"
    },
    {
      "id": 23,
      "name": "Noakhali",
      "bn_name": "নোয়াখালী"
    },
    {
      "id": 24,
      "name": "Rangamati",
      "bn_name": "রাঙ্গামাটি"
    },
    {
      "id": 25,
      "name": "Bogra",
      "bn_name": "বগুড়া"
    },
    {
      "id": 26,
      "name": "Chapainawabganj",
      "bn_name": "চাপাইনবাবগঞ্জ"
    },
    {
      "id": 27,
      "name": "Joypurhat",
      "bn_name": "জয়পুরহাট"
    },
    {
      "id": 28,
      "name": "Naogaon",
      "bn_name": "নওগাঁ"
    },
    {
      "id": 29,
      "name": "Natore",
      "bn_name": "নাটোর"
    },
    {
      "id": 30,
      "name": "Pabna",
      "bn_name": "পাবনা"
    },
    {
      "id": 31,
      "name": "Rajshahi",
      "bn_name": "রাজশাহী"
    },
    {
      "id": 32,
      "name": "Sirajgonj",
      "bn_name": "সিরাজগঞ্জ"
    },
    {
      "id": 33,
      "name": "Bagerhat",
      "bn_name": "বাগেরহাট"
    },
    {
      "id": 34,
      "name": "Chuadanga",
      "bn_name": "চুয়াডাঙ্গা"
    },
    {
      "id": 35,
      "name": "Jessore",
      "bn_name": "যশোর"
    },
    {
      "id": 36,
      "name": "Jhenaidah",
      "bn_name": "ঝিনাইদহ"
    },
    {
      "id": 37,
      "name": "Khulna",
      "bn_name": "খুলনা"
    },
    {
      "id": 38,
      "name": "Kushtia",
      "bn_name": "কুষ্টিয়া"
    },
    {
      "id": 39,
      "name": "Magura",
      "bn_name": "মাগুরা"
    },
    {
      "id": 40,
      "name": "Meherpur",
      "bn_name": "মেহেরপুর"
    },
    {
      "id": 41,
      "name": "Narail",
      "bn_name": "নড়াইল"
    },
    {
      "id": 42,
      "name": "Satkhira",
      "bn_name": "সাতক্ষীরা"
    },
    {
      "id": 43,
      "name": "Barguna",
      "bn_name": "বরগুনা"
    },
    {
      "id": 44,
      "name": "Barisal",
      "bn_name": "বরিশাল"
    },
    {
      "id": 45,
      "name": "Bhola",
      "bn_name": "ভোলা"
    },
    {
      "id": 46,
      "name": "Jhalokati",
      "bn_name": "ঝালকাঠি"
    },
    {
      "id": 47,
      "name": "Patuakhali",
      "bn_name": "পটুয়াখালী"
    },
    {
      "id": 48,
      "name": "Pirojpur",
      "bn_name": "পিরোজপুর"
    },
    {
      "id": 49,
      "name": "Habiganj",
      "bn_name": "হবিগঞ্জ"
    },
    {
      "id": 50,
      "name": "Maulvibazar",
      "bn_name": "মৌলভীবাজার"
    },
    {
      "id": 51,
      "name": "Sunamganj",
      "bn_name": "সুনামগঞ্জ"
    },
    {
      "id": 52,
      "name": "Sylhet",
      "bn_name": "সিলেট"
    },
    {
      "id": 53,
      "name": "Dinajpur",
      "bn_name": "দিনাজপুর"
    },
    {
      "id": 54,
      "name": "Gaibandha",
      "bn_name": "গাইবান্ধা"
    },
    {
      "id": 55,
      "name": "Kurigram",
      "bn_name": "কুড়িগ্রাম"
    },
    {
      "id": 56,
      "name": "Lalmonirhat",
      "bn_name": "লালমনিরহাট"
    },
    {
      "id": 57,
      "name": "Nilphamari",
      "bn_name": "নীলফামারী"
    },
    {
      "id": 58,
      "name": "Panchagarh",
      "bn_name": "পঞ্চগড়"
    },
    {
      "id": 59,
      "name": "Rangpur",
      "bn_name": "রংপুর"
    },
    {
      "id": 60,
      "name": "Thakurgaon",
      "bn_name": "ঠাকুরগাঁও"
    },
    {
      "id": 61,
      "name": "Jamalpur",
      "bn_name": "জামালপুর"
    },
    {
      "id": 62,
      "name": "Mymensingh",
      "bn_name": "ময়মনসিংহ"
    },
    {
      "id": 63,
      "name": "Netrokona",
      "bn_name": "নেত্রকোণা"
    },
    {
      "id": 64,
      "name": "Sherpur",
      "bn_name": "শেরপুর"
    }
  ]

  export default dbDistrict;