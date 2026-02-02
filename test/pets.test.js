import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Supertest-Pets API", function () {

  let petId;

  it("GET- Debe traer todas las mascotas", async function () {
    const { status, body } = await requester.get("/api/pets");

    expect(status).to.equal(200);
    expect(body.status).to.equal("success");
    expect(body.payload).to.be.an("array");
  });

  it("POST- Debe crear una mascota correctamente", async function () {
    const mockPet = {
      name: "Luna",
      specie: "gato",
      birthDate: "10-05-2026"
    };

    const { status, body } = await requester
      .post("/api/pets")
      .send(mockPet);

    expect(status).to.equal(200);
    expect(body.status).to.equal("success");
    expect(body.payload).to.have.property("_id");
    expect(body.payload).to.have.property("adopted").to.be.false;

    petId = body.payload._id;
  });

  it("POST- Debe fallar si faltan datos", async function () {
    const badPet = {
      name: "Faltan datos"
    };

    const { status, body } = await requester
      .post("/api/pets")
      .send(badPet);

    expect(status).to.equal(400);
    expect(body.status).to.equal("error");
  });

  it("PUT- Debe actualizar una mascota", async function () {
    const updateData = {
      name: "Se actualizaron los datos"
    };

    const { status, body } = await requester
      .put(`/api/pets/${petId}`)
      .send(updateData);

    expect(status).to.equal(200);
    expect(body.status).to.equal("success");
    expect(body.message).to.equal("pet updated");
  });

  it("DELETE- Debe eliminar una mascota", async function () {
    const { status, body } = await requester
      .delete(`/api/pets/${petId}`);

    expect(status).to.equal(200);
    expect(body.status).to.equal("success");
    expect(body.message).to.equal("pet deleted");
  });

});