import unittest

from support import run_solution


class CreatePrintList3Test(unittest.TestCase):
    def test_case_01_1_2_3(self):
        """1, 2, 3."""
        result = run_solution('create-print-list-3', '3\n1\n2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[1, 2, 3]\n')

    def test_case_02_one_value(self):
        """one value."""
        result = run_solution('create-print-list-3', '1\n42\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[42]\n')


if __name__ == "__main__":
    unittest.main()
