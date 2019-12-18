export default function() {
  return [
    {
      title: "Main Dashboard",
      to: "/main",
      htmlBefore: '<i class="material-icons">settings</i>',
      htmlAfter: ""
    },       
    {
      title: "Device One",
      htmlBefore: '<i class="material-icons">whatshot</i>',
      to: "/device-one",
    },
    {
      title: "Device Two",
      htmlBefore: '<i class="material-icons">opacity</i>',
      to: "/device-two",
    },
    {
      title: "Device Three",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/device-three",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
