
export function getClassOptionList(classes=[]) {
    const list = [];
    classes.map((item) => {
      list.push({
        id: item.id,
        value: item.name,
        label: item.name,
        sec: item.sec,
      });
    });
   return list;;
  }
