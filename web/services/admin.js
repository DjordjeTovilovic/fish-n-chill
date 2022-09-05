import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL
const getAllUserComplaintAndRevision = async () => {
  const res = await axios.get(baseUrl + `admin`)
  return res.data
}

const approveClientRevision = async (id) => {
  const res = await axios.post(baseUrl + `admin/revision/${id}`)
  return res.data
}

const deleteUserRequest = async (id) => {
  const res = await axios.delete(baseUrl + `admin/user-request/${id}`)
  return res.data
}

const approveClientComplaint = async (id, response) => {
  const res = await axios.post(baseUrl + `admin/complaint/${id}`, { response: response })
  return res.data
}

const approveDeletionRequest = async (id) => {
  const res = await axios.post(baseUrl + `admin/delete-request/${id}`)
  return res.data
}

const adminService = {
  getAllUserComplaintAndRevision,
  approveClientRevision,
  deleteUserRequest,
  approveClientComplaint,
  approveDeletionRequest,
}
export default adminService
