//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication3.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class OilMakerCompany
    {
        public OilMakerCompany()
        {
            this.Oils = new HashSet<Oil>();
        }
    
        public int OilMakerId { get; set; }
        public string OilMakerName { get; set; }
    
        public virtual ICollection<Oil> Oils { get; set; }
    }
}
