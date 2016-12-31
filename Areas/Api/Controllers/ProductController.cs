using System;
using System.Net;
using System.Web;
using System.Web.Http;
using Interfaces.IServices;
using IstMvcFramework.ModelMappers;
using MainDomain = Models.RequestModels;

namespace IstMvcFramework.Areas.Api.Controllers
{
    public class ProductController : ApiController
    {
        private readonly IProductService productService;

        /// <summary>
        /// Constructor
        /// </summary>
        public ProductController(IProductService productService)
        {
            if (productService == null)
            {
                throw new ArgumentNullException("productService");    
            }
   
            this.productService = productService;
        }

        /// <summary>
        /// Get Products
        /// </summary>
        //public Models.ProductResponse Get([FromUri] MainDomain.ProductSearchRequest request)
        //{
        //    if (request == null || !ModelState.IsValid)
        //    {
        //        throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
        //    }

        //    return productService.LoadAllProducts(request).CreateFrom();
        //}

        /// <summary>
        /// Update a product
        /// </summary>
        public void Post(Models.Product product)
        {
            if (product == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            productService.Update(product.CreateFrom());
        }

        /// <summary>
        /// Adds a product
        /// </summary>
        public void Put(Models.Product product)
        {
            if (product == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            productService.AddProduct(product.CreateFrom());
        }

        /// <summary>
        /// Delete a Product
        /// </summary>
        public void Delete(Models.Product product)
        {
            if (product == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            productService.DeleteProduct(product.CreateFrom());
        }
    }
}