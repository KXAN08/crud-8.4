import React, { Component } from "react";

export default class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      showModal: false,
      currentRecord: { 
        id: null, 
        name: "", 
        email: "", 
        phone: "", 
        age: "", 
        status: "",
        gender: "",  
      },
      isEditing: false,
    };
  }

  componentDidMount() {
    const data = localStorage.getItem("records");
    if (data) {
      this.setState({ records: JSON.parse(data) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.records !== this.state.records) {
      localStorage.setItem("records", JSON.stringify(this.state.records));
    }
  }

  toggleModal = () => {
    this.setState({ 
      showModal: !this.state.showModal, 
      currentRecord: { 
        id: null, 
        name: "", 
        email: "", 
        phone: "", 
        age: "", 
        status: "", 
        gender: "",
      },
      isEditing: false
    }, () => {
      document.body.style.overflow = this.state.showModal ? 'hidden' : 'scroll';
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      currentRecord: { ...this.state.currentRecord, [name]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { records, currentRecord, isEditing } = this.state;

    if (isEditing) {
      this.setState({
        records: records.map((rec) =>
          rec.id === currentRecord.id ? currentRecord : rec
        ),
        showModal: false,
      }, () => document.body.style.overflow = 'scroll');
    } else {
      this.setState({
        records: [
          ...records,
          { ...currentRecord, id: Date.now() }
        ],
        showModal: false,
      }, () => document.body.style.overflow = 'scroll');
    }
  };

  handleEdit = (record) => {
    this.setState({
      showModal: true,
      currentRecord: record,
      isEditing: true,
    }, () => document.body.style.overflow = 'hidden');
  };

  handleDelete = (id) => {
    this.setState({
      records: this.state.records.filter((rec) => rec.id !== id),
    });
  };

  render() {
    const { records, showModal, currentRecord } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-700">Foydalanuvchilar Jadvali</h1>
            <button onClick={this.toggleModal} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              + Qo‘shish
            </button>
          </div>

          <table className="w-full border text-center text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2">Ism</th>
                <th className="p-2">Email</th>
                <th className="p-2">Telefon</th>
                <th className="p-2">Yosh</th>
                <th className="p-2">Jinsi</th>
                <th className="p-2">Status</th>
                <th className="p-2">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{rec.name}</td>
                  <td className="p-2">{rec.email}</td>
                  <td className="p-2">{rec.phone}</td>
                  <td className="p-2">{rec.age}</td>
                  <td className="p-2">{rec.gender}</td>
                  <td className="p-2">{rec.status}</td>
                  <td className="p-2 min-w-[200px]">
                    <button onClick={() => this.handleEdit(rec)} className="bg-yellow-400 hover:bg-yellow-600 h-10 px-3 py-1 rounded mr-2 text-white">
                      Tahrirlash
                    </button>
                    <button onClick={() => this.handleDelete(rec.id)} className="bg-red-500 hover:bg-red-700 h-10 px-3 py-1 rounded text-white">
                      O‘chirish
                    </button>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">Ma'lumot yo‘q</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Yangi Ma'lumot Qo‘shish</h2>
              <form onSubmit={this.handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Ism"
                  value={currentRecord.name}
                  onChange={this.handleChange}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required/>
                <input type="email" name="email" placeholder="Email"
                  value={currentRecord.email}
                  onChange={this.handleChange}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required/>
                <input type="text" name="phone" placeholder="Telefon"
                  value={currentRecord.phone}
                  onChange={this.handleChange}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required/>
                <input type="number" name="age" placeholder="Yosh"
                  value={currentRecord.age}
                  onChange={this.handleChange}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required/>
                <select
                  name="status"
                  value={currentRecord.status}
                  onChange={this.handleChange}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required>
                  <option value="">Statusni tanlang</option>
                  <option value="O‘qiydi">O‘qiydi</option>
                  <option value="Ishlaydi">Ishlaydi</option>
                </select>

                <div>
                  <p className="text-gray-600 mb-2">Jins:</p>
                  <label className="mr-4">
                    <input type="radio" name="gender" value="Erkak"
                      checked={currentRecord.gender === "Erkak"}
                      onChange={this.handleChange}
                      className="mr-1" /> Erkak
                  </label>
                  <label>
                    <input type="radio" name="gender" value="Ayol"
                      checked={currentRecord.gender === "Ayol"}
                      onChange={this.handleChange}
                      className="mr-1" /> Ayol
                  </label>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={this.toggleModal} className="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400">
                    Bekor qilish
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
