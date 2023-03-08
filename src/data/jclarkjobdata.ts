import AppState from "../types/appState";

const data: AppState = {
  name: {
    data: {
      firstName: "Justin",
      lastName: "Clark",
      prefix: "-None Selected-",
      suffix: "-None Selected-",
      pronouns: ["-None Selected-"],
    },
    error: false,
    prevRendered: true,
  },
  contactAddress: {
    data: {
      address1: "1030 W. MacArthur Blvd",
      city: "Santa Ana",
      state: "CA",
      zip: "92660",
      address2: "#156",
    },
    error: false,
    prevRendered: true,
  },
  contactPhone: {
    data: {
      home: "",
      mobile: "(562)895-3754",
      other: "",
    },
    error: false,
    prevRendered: true,
  },
  contactWeb: {
    data: {
      email: ["justindanielclark@gmail.com"],
      websites: [
        {
          URL: "https://github.com/justindanielclark",
          websiteName: "GitHub",
        },
        {
          URL: "https://facebook.com/justindanielclark",
          websiteName: "Facebook",
        },
      ],
    },
    error: false,
    prevRendered: true,
  },
  education: {
    data: [
      {
        degree: "Bachelors",
        degreeType: "Arts",
        end: {
          data: new Date("2013-06-01T07:00:00.000Z"),
          current: false,
        },
        field: "Philosophy",
        school: "California Polytechnic University - Pomona",
      },
      {
        degree: "Associates",
        degreeType: "Science",
        end: {
          data: new Date("2018-06-01T07:00:00.000Z"),
          current: false,
        },
        field: "Computer Science",
        school: "Cerritos Community College",
      },
    ],
    error: false,
    prevRendered: true,
  },
  nonCollegiateEducation: {
    data: [
      {
        description:
          "A web platform with self-directed learning on HTML, JS, CSS, React, and Node with a collection of 31 Assignments to complete by projects end. Projects increase in relative complexity and tools required to complete in an effort to simulate real world learning challenges.",
        end: {
          current: true,
          data: new Date("2023-03-06T21:49:04.711Z"),
        },
        program: "The Odin Project",
      },
    ],
    error: false,
    prevRendered: true,
  },
  references: {
    data: [
      {
        email: "mnavarro@prominentescrow.com",
        fName: "Michelle",
        lName: "Navarro",
        phone: "(714)867-9716",
        relation: "Branch Manager - Prominent Escrow",
      },
      {
        email: "ryan@prominentescrow.com",
        fName: "Ryan",
        lName: "Spitalnick",
        phone: "(949)280-5392",
        relation: "Owner and General Counsel - Prominent Escrow",
      },
      {
        email: "steph@ProminentEscrow.com",
        fName: "Stephanie",
        lName: "Chew",
        phone: "(714)797-4400",
        relation: "Supervising Senior Escrow Officer - Prominent Escrow",
      },
    ],
    error: false,
    prevRendered: true,
  },
  workExperience: {
    data: [
      // {
      //   address: {
      //     address1: "170 Newport Center Drive",
      //     city: "Newport Beach",
      //     state: "CA",
      //     zip: "92660",
      //     address2: "Suite 150",
      //   },
      //   companyName: "Prominent Escrow Services, Inc.",
      //   description:
      //     "- Handled luxury residential sale transactions from start to finish in a fast turnaround environment\n- Implemented tech solutions to coordinate a team of 4 in processing an active 100 escrows a month and an average of 500 emails a day\n- Oversaw the growth of the luxury desk to twice it's monthly earnings\n- Managed a team of 4",
      //   endDate: {
      //     data: new Date("2023-03-06T21:22:10.029Z"),
      //     current: true,
      //   },
      //   jobTitle: "Escrow Officer",
      //   startDate: {
      //     data: new Date("2016-02-18T08:00:00.000Z"),
      //   },
      // },
    ],
    error: false,
    prevRendered: true,
  },
  projects: {
    data: [
      {
        description:
          "Recreation of the classic Hasbro Battleship game done in 16 bit glory, animated entirely in HTML's built in Canvas API with a dedicated 480x360 or 360x480 viewport and pixel perfect positioning of items. Expanded to include ship abilities.",
        name: "Battleship",
        skills: "Typescript, Webpack, HTML, Tailwind, CSS",
        liveURL: "https://justindanielclark.github.io/battleship/",
        repoURL: "https://github.com/justindanielclark/battleship",
      },
      {
        description:
          "A real-time weather service app that provides 5 days of weather info based on provided coordinates or city information. Utilizes data available from https://openweathermap.org/api",
        name: "Weather App",
        skills: "Javascript, Webpack, Tailwind, HTML, CSS",
        liveURL: "https://justindanielclark.github.io/Weather/",
        repoURL: "https://github.com/justindanielclark/Weather",
      },
      {
        description:
          "Robust To Do App built to be mobile friendly complete with animations and varied displays",
        name: "To Do App",
        skills: "Javascript, HTML, CSS, LocalStorage, Tailwind, Webpack",
        liveURL: "https://justindanielclark.github.io/ToDoList/",
        repoURL: "https://github.com/justindanielclark/ToDoList",
      },
    ],
    error: false,
    prevRendered: true,
  },
};

export default data;
