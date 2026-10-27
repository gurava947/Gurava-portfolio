import unittest

from support import run_solution


class LuckyNumber2Test(unittest.TestCase):
    def test_case_01_18_is_a_multiple_of_9(self):
        """18 is a multiple of 9."""
        result = run_solution('lucky-number-2', '18\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Lucky Number\n')

    def test_case_02_90_starts_with_9(self):
        """90 starts with 9."""
        result = run_solution('lucky-number-2', '90\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Lucky Number\n')

    def test_case_03_29_ends_with_9(self):
        """29 ends with 9."""
        result = run_solution('lucky-number-2', '29\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Lucky Number\n')

    def test_case_04_23_is_unlucky(self):
        """23 is unlucky."""
        result = run_solution('lucky-number-2', '23\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Unlucky Number\n')


if __name__ == "__main__":
    unittest.main()
