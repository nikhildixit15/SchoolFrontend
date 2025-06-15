
export function getClassOptionList(classes=[]) {
    const list = [];
    classes.map((item) => {
      list.push({
        id: item.id || item._id,
        value: item.name,
        label: item.name,
        sec: item.sec,
      });
    });
   return list;;
  }


export function getOptionList(classes=[], ) {
  const list = [];
  classes.map((item) => {
    list.push({
      id: item.id || item._id,
      value: item.name,
      label: item.name,
    });
  });
 return list;;
}
