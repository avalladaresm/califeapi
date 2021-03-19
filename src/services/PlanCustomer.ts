import { Req, Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { AuthenticateUserType } from "../middlewares/AuthenticateUserType";
import { addYears } from 'date-fns'

enum Types {
  USER_CLIENT = "USER_CLIENT",
  USER_ADMIN = "USER_ADMIN",
  USER_ADMIN_ROOT = "USER_ADMIN_ROOT",
}

@Service()
export class PlanCustomerService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getAllPlansCustomers(@Req() req: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const plansCustomers = await this.connection.query('CALL getPlansCustomers()')
      if (plansCustomers[0].length === 0) return []
      return plansCustomers[0]
    }
    catch (e) {
      throw e
    }
  }

  async getPlanCustomerByUserId(userId: number): Promise<any> {
    try {
      //this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const planCustomer = await this.connection.query('CALL PLANSCUSTOMERS_GetPlansCustomersByIdUser(?)', [userId])
      if (planCustomer[0].length === 0) return []
      return planCustomer[0]
    }
    catch (e) {
      throw e
    }
  }

  async getPlanCustomerByCustomerId(customerId: number): Promise<any> {
    try {
      let data: any = {}

      const customerPlan = await this.connection.query('CALL PLANSCUSTOMERS_GetCustomerPlan(?)', [customerId])
      if (customerPlan[0].length === 0) data['customerPlan'] = []
      else data['customerPlan'] = customerPlan[0][0]

      const customerDetails = await this.connection.query('CALL PLANSCUSTOMERS_GetCustomerDetails(?)', [customerId])
      if (customerDetails[0].length === 0) data['customerDetails'] = []
      else data['customerDetails'] = customerDetails[0][0]

      const customerAddresses = await this.connection.query('CALL PLANSCUSTOMERS_GetCustomerAddresses(?)', [customerId])
      if (customerAddresses[0].length === 0) data['customerAddresses'] = []
      else data['customerAddresses'] = customerAddresses[0]

      const customerIdentificationDocuments = await this.connection.query('CALL PLANSCUSTOMERS_GetCustomerIdentificationDocuments(?)', [customerId])
      if (customerIdentificationDocuments[0].length === 0) data['customerIdentificationDocuments'] = []
      else data['customerIdentificationDocuments'] = customerIdentificationDocuments[0]

      const customerPhoneNumbers = await this.connection.query('CALL PLANSCUSTOMERS_GetCustomerPhoneNumbers(?)', [customerId])
      if (customerPhoneNumbers[0].length === 0) data['customerPhoneNumbers'] = []
      else data['customerPhoneNumbers'] = customerPhoneNumbers[0]

      const customerBeneficiaries = await this.connection.query('CALL PLANSCUSTOMERS_GetCustomerBeneficiaries(?)', [customerId])
      if (customerBeneficiaries[0].length === 0) data['customerBeneficiaries'] = []
      else data['customerBeneficiaries'] = customerBeneficiaries[0]

      const dependants = await this.connection.query('CALL CUSTOMER_GetCustomerDependants(?)', [customerPlan[0][0]?.idCustomer])

      if (dependants[0].length === 0) data['dependants'] = []
      else data['dependants'] = []

      for (const _dependants of dependants[0]) {
        let dependants: any = {}

        const dependantDetails = await this.connection.query('CALL DEPENDANT_GetCustomerDependantDetails(?)', [_dependants.idDependant])

        if (dependantDetails[0].length === 0) data['dependantDetails'] = []
        else dependants['dependantDetails'] = dependantDetails[0][0]

        const dependantAddresses = await this.connection.query('CALL DEPENDANT_GetCustomerDependantAddresses(?)', [_dependants.idDependant])
        if (dependantAddresses[0].length === 0) dependants['dependantAddresses'] = []
        else dependants['dependantAddresses'] = dependantAddresses[0]

        const dependantIdentificationDocuments = await this.connection.query('CALL DEPENDANT_GetCustomerDependantIdentificationDocuments(?)', [_dependants.idDependant])
        if (dependantIdentificationDocuments[0].length === 0) dependants['dependantIdentificationDocuments'] = []
        else dependants['dependantIdentificationDocuments'] = dependantIdentificationDocuments[0]

        const dependantPhoneNumbers = await this.connection.query('CALL DEPENDANT_GetCustomerDependantPhoneNumbers(?)', [_dependants.idDependant])
        if (dependantPhoneNumbers[0].length === 0) dependants['dependantPhoneNumbers'] = []
        else dependants['dependantPhoneNumbers'] = dependantPhoneNumbers[0]

        data.dependants.push(dependants)
      }

      return data
    }
    catch (e) {
      throw e
    }
  }

  async createCustomerPlan(data: any): Promise<any> {
    try {
      const customer = await this.connection.query('CALL PLANSCUSTOMERS_CreateCustomerPlan(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        data.data.uid,
        data.data.planId,
        data.data.holderAge,
        data.data.holderDob,
        data.data.partnerAge,
        data.data.partnerDob,
        data.data.includePartner,
        data.data.children,
        data.data.lifeInsurance,
        data.data.includeMaternity,
        data.data.downPayment,
        data.data.installmentPayment,
        data.data.status,
        data.data.firstname,
        data.data.middlename,
        data.data.firstSurname,
        data.data.secondSurname,
        data.data.surnameAfterMarried,
        data.data.email,
        data.data.gender,
        new Date(data.data.birthDate),
        data.data.maritalStatus,
        data.data.occupation,
        data.data.weight,
        data.data.height,
        data.data.worksAt,
        data.data.workAddress,
        data.data.neighborhood,
        data.data.avenue,
        data.data.street,
        data.data.block,
        data.data.houseNumber,
        data.data.addressType,
        data.data.city,
        data.data.state,
        data.data.country,
        data.data.identificationDocument,
        data.data.identificationDocumentType,
        data.data.cellphoneNumber,
        data.data.telephoneNumber,
        data.data.faxNumber
      ])

      data.data.beneficiaries?.forEach(async (b: any) => {
        await this.connection.query('CALL CUSTOMER_CreateCustomerBeneficiary(?,?,?,?,?)', [customer[0][0].id, b.beneficiaryFullname, b.beneficiaryKin, b.beneficiaryIdentificationDocument, b.beneficiaryPercentage])
      });

      data.data.dependants?.forEach(async (d: any) => {
        await this.connection.query('CALL DEPENDANT_CreateDependant(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          customer[0][0].id,
          d.dependantFirstname,
          d.dependantMiddlename,
          d.dependantFirstSurname,
          d.dependantSecondSurname,
          d.dependantSurnameAfterMarried,
          d.dependantEmail,
          d.dependantGender,
          new Date(d.dependantBirthDate),
          d.dependantMaritalStatus,
          d.dependantOccupation,
          d.dependantWeight,
          d.dependantHeight,
          d.dependantWorksAt,
          d.dependantWorkAddress,
          d.dependantNeighborhood,
          d.dependantAvenue,
          d.dependantStreet,
          d.dependantBlock,
          d.dependantHouseNumber,
          d.dependantAddressType,
          d.dependantCity,
          d.dependantState,
          d.dependantCountry,
          d.dependantIdentificationDocument,
          d.dependantIdentificationDocumentType,
          d.dependantCellphoneNumber,
          d.dependantTelephoneNumber,
          d.dependantFaxNumber
        ])
      });
      return customer
    }
    catch (e) {
      throw e
    }
  }

  async updateCustomerPlanStatus(planId: number): Promise<any> {
    try {
      await this.connection.query('CALL updatePlansCustomerStatus(?,?,?,?)', [planId, 'success', new Date(), addYears(new Date(), 1)])
    }
    catch (e) {
      throw e
    }
  }

  async createPlanCustomer(data: any): Promise<any> {
    try {
      await this.connection.query('CALL PLANCUSTOMERS_CreatePlanCustomer(?,?,?,?,?,?,?,?,?)', [
        data.data.planId,
        data.data.holderDob,
        data.data.partnerDob,
        data.data.children,
        data.data.lifeInsurance,
        data.data.isMaternityIncluded,
        data.data.installments,
        data.data.downPayment,
        data.data.installmentPayment,
      ])
    }
    catch (e) {
      throw e
    }
  }
}