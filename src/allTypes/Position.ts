import { objectType } from '@nexus/schema'
import { differenceInYears, differenceInMonths } from "date-fns"

export const Position = objectType({
  name: "Position",
  definition(t) {
    t.id("id")
    t.string("title")
    t.string("company")
    t.date("startDate", (position) => new Date(position.startDate))
    t.date("endDate", { 
      nullable: true,
      resolve: (position) => position.endDate ? new Date(position.endDate) : null
    })
    t.int("years", ({endDate, startDate}) => differenceInYears(
        endDate ? new Date(endDate) : new Date(), 
        new Date(startDate)
      )
    )
    t.int("months", ({endDate, startDate}) => differenceInMonths(
        endDate ? new Date(endDate) : new Date(), 
        new Date(startDate)
      ) % 12
    ) 
    t.list.string("achievements", (position) => position.achievements)
    
  }
})

// id: "1",
// title: "Director of Engineering",
// company: "FlipGive",
// startDate: "2019-11-01",
// endDate: null,
// employmentType: "FULL_TIME",
// location: "Toronto, Canada",
// achievements: [