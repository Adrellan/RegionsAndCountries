using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RegionsAndCountries_api.Models
{
    public partial class Country
    {
        [Required(ErrorMessage = "Ctyid is required.")]
        [MinLength(2, ErrorMessage = "The field Ctyid must be a string or array type with a minimum length of '2'.")]
        [MaxLength(2, ErrorMessage = "The field Ctyid must be a string or array type with a maximum length of '2'.")]
        public string Ctyid { get; set; } = null!;

        [Required(ErrorMessage = "Ctyname is required.")]
        [MaxLength(50, ErrorMessage = "The field Ctyname must be a string or array type with a maximum length of '50'.")]
        public string Ctyname { get; set; } = null!;


        [Required(ErrorMessage = "ctyregid is required.")]
        public int Ctyregid { get; set; } 

        [JsonIgnore]
        public virtual Regio? Ctyreg { get; set; } = null!;
    }
}
