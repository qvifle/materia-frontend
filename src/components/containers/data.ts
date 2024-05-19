import { IDesk } from "@/types/desk.types";
import { TaskStatus } from "@/types/task.types";

const data: IDesk[] = [
  {
    id: "2fc0710b-9b21-4077-af62-fb7d57af4122",
    title: "A",
    color: null,
    // createdAt: "2024-05-12T15:02:41.987Z",
    projectId: "28be631c-ebe8-4fe1-b021-7322f2595edf",
    tasks: [
      {
        id: "bfe94f14-c7a6-4adb-805e-badd4315905b",
        title: "a1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:02:50.484Z"),
        orderId: 0,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
      {
        id: "0ae86e49-505f-4b11-a76a-1188e0c89ccc",
        title: "b1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:02:52.930Z"),
        orderId: 1,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
      {
        id: "d2b38715-91f0-4bc6-8920-08e287f2a4b1",
        title: "c1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:02:57.044Z"),
        orderId: 2,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
      {
        id: "62cb4303-180f-4ccd-97c8-618dc693a646",
        title: "d1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:02:59.983Z"),
        orderId: 3,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
      {
        id: "addef2d8-6325-4a22-beb8-50a5f9a6b4a9",
        title: "e1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:03.046Z"),
        orderId: 4,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
    ],
  },
  {
    id: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
    title: "B",
    color: null,
    // createdAt: new Date("2024-05-12T15:02:44.185Z"),
    projectId: "28be631c-ebe8-4fe1-b021-7322f2595edf",
    tasks: [
      {
        id: "c58a1ff9-7959-4de9-a1c2-9fd2771059c7",
        title: "a2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:06.181Z"),
        orderId: 0,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
      {
        id: "76e2d24e-0e8d-447f-9a54-1fafed6e5e33",
        title: "b2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:08.767Z"),
        orderId: 1,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
      {
        id: "4bdd760e-baf9-4694-8787-f3978c58a809",
        title: "c2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:11.161Z"),
        orderId: 2,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
      {
        id: "06184d01-597e-4f08-94b8-bff6d10bce4f",
        title: "d2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:13.856Z"),
        orderId: 3,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
      {
        id: "fa7a3996-ffae-4052-a9fa-135dcc4dc8c7",
        title: "e2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:17.228Z"),
        orderId: 4,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
    ],
  },
  {
    id: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
    title: "C",
    color: null,
    // createdAt: new Date("2024-05-12T15:02:46.312Z"),
    projectId: "28be631c-ebe8-4fe1-b021-7322f2595edf",
    tasks: [
      {
        id: "3402b151-ef42-4e5b-b5f4-0b07e88b49bb",
        title: "a3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:23.493Z"),
        orderId: 0,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
      {
        id: "51f16eb9-e316-4d5c-8555-358c384b1f66",
        title: "b3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:26.242Z"),
        orderId: 1,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
      {
        id: "5bc2c9c9-bc62-4bf0-b886-50ed9eee015b",
        title: "c3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:28.693Z"),
        orderId: 2,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
      {
        id: "68e33a1c-d4de-4e73-86a9-0dd4a8b1bbf8",
        title: "d3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:31.646Z"),
        orderId: 3,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
      {
        id: "7ebd3c56-4424-48c8-a713-75c5d458ab84",
        title: "e3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:51.813Z"),
        orderId: 4,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
    ],
  },
];

export default data;
 export const newData: IDesk[] = [
  {
    id: "2fc0710b-9b21-4077-af62-fb7d57af4122",
    title: "A",
    color: null,
    // createdAt: "2024-05-12T15:02:41.987Z",
    projectId: "28be631c-ebe8-4fe1-b021-7322f2595edf",
    tasks: [
      {
        id: "0ae86e49-505f-4b11-a76a-1188e0c89ccc",
        title: "b1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:02:52.930Z"),
        orderId: 1,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
      {
        id: "bfe94f14-c7a6-4adb-805e-badd4315905b",
        title: "a1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:02:50.484Z"),
        orderId: 0,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
      {
        id: "d2b38715-91f0-4bc6-8920-08e287f2a4b1",
        title: "c1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:02:57.044Z"),
        orderId: 2,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
      {
        id: "62cb4303-180f-4ccd-97c8-618dc693a646",
        title: "d1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:02:59.983Z"),
        orderId: 3,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
      {
        id: "addef2d8-6325-4a22-beb8-50a5f9a6b4a9",
        title: "e1",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:03.046Z"),
        orderId: 4,
        deskId: "2fc0710b-9b21-4077-af62-fb7d57af4122",
      },
    ],
  },
  {
    id: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
    title: "B",
    color: null,
    // createdAt: new Date("2024-05-12T15:02:44.185Z"),
    projectId: "28be631c-ebe8-4fe1-b021-7322f2595edf",
    tasks: [
      {
        id: "c58a1ff9-7959-4de9-a1c2-9fd2771059c7",
        title: "a2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:06.181Z"),
        orderId: 0,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
      {
        id: "76e2d24e-0e8d-447f-9a54-1fafed6e5e33",
        title: "b2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:08.767Z"),
        orderId: 1,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
      {
        id: "4bdd760e-baf9-4694-8787-f3978c58a809",
        title: "c2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:11.161Z"),
        orderId: 2,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
      {
        id: "06184d01-597e-4f08-94b8-bff6d10bce4f",
        title: "d2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:13.856Z"),
        orderId: 3,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
      {
        id: "fa7a3996-ffae-4052-a9fa-135dcc4dc8c7",
        title: "e2",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:17.228Z"),
        orderId: 4,
        deskId: "af7a20ba-5170-4dbf-b19d-9b4d87f9ae6c",
      },
    ],
  },
  {
    id: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
    title: "C",
    color: null,
    // createdAt: new Date("2024-05-12T15:02:46.312Z"),
    projectId: "28be631c-ebe8-4fe1-b021-7322f2595edf",
    tasks: [
      {
        id: "3402b151-ef42-4e5b-b5f4-0b07e88b49bb",
        title: "a3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:23.493Z"),
        orderId: 0,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
      {
        id: "51f16eb9-e316-4d5c-8555-358c384b1f66",
        title: "b3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:26.242Z"),
        orderId: 1,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
      {
        id: "5bc2c9c9-bc62-4bf0-b886-50ed9eee015b",
        title: "c3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:28.693Z"),
        orderId: 2,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
      {
        id: "68e33a1c-d4de-4e73-86a9-0dd4a8b1bbf8",
        title: "d3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:31.646Z"),
        orderId: 3,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
      {
        id: "7ebd3c56-4424-48c8-a713-75c5d458ab84",
        title: "e3",
        description: null,
        status: TaskStatus.PENDING,
        createdAt: new Date("2024-05-12T15:03:51.813Z"),
        orderId: 4,
        deskId: "ffe00189-cee5-42b4-a362-eb96d3f3d865",
      },
    ],
  },
];
